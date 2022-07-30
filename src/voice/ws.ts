import pipe from "@discall/simple-pipe";
import { NoneValidEncryptionMode } from "../error";
import { WebSocket } from "../runtimeModule";
import { DiscordData, Opcode, SnowflakeData, VoiceOpcode, VoiceServerUpdateEventData } from "../typo";
import __ws from "../ws";
import udp from "./udp";

enum VoiceStates {
    OPEN = 1,
    RESUME,
    LOGIN,
    SELECT,
    READY
}

let registered = false;
let clients: Map<SnowflakeData, WebSocket.WebSocket> = new Map();
export default function voice(_ws: ReturnType<typeof __ws>) {
    if (registered)
        return _ws;

    let onMessage = _ws.onmessage;
    let user_id: SnowflakeData, session_id: string;
    _ws.onmessage = async (event) => {
        let data = await onMessage(event);
        if (data.op === Opcode.Dispatch) {
            switch(data.t) {
            case "READY":
                user_id = data.d.user.id;
                session_id = data.d.session_id;
                break;
            case "VOICE_SERVER_UPDATE":
                let server: VoiceServerUpdateEventData = data.d;
                clients.set(server.guild_id, ws(
                    server.endpoint,
                    server.token,
                    session_id,
                    server.guild_id,
                    user_id
                ));
            }
        }

        return data;
    }

    registered = true;
    return _ws;
}

let states: Map<SnowflakeData, VoiceStates> = new Map();
let heartbeatIDs: Map<SnowflakeData, NodeJS.Timer> = new Map();
let ssrcs: Map<SnowflakeData, number>;
let udpSends: Map<SnowflakeData, (data: Buffer, secretKey?: Buffer) => Promise<void>> = new Map();
function ws(endpoint: string, token: string, session_id: string, server_id: SnowflakeData, user_id: SnowflakeData): WebSocket.WebSocket {
    let ws = new WebSocket.WebSocket(`wss://${endpoint}?v=4`);
    if (!states.has(server_id))
        states.set(server_id, VoiceStates.OPEN);

    ws.onopen = () => open(ws, user_id, server_id, session_id, token);
    ws.onclose = (event) => close(event, endpoint, token, session_id, user_id, server_id);
    ws.onerror = () => error(server_id);
    ws.onmessage = (event) => message(ws, event, server_id);

    return ws;
}

export async function send(ws: WebSocket.WebSocket, data: DiscordData) {
    return await pipe(data)
        .pipe(JSON.stringify)
        .pipe(ws.send)
        .execute();
}

async function open(ws: WebSocket.WebSocket, user_id: SnowflakeData, server_id: SnowflakeData, session_id: string, token: string) {
    switch(states.get(server_id)) {
    case VoiceStates.OPEN:
        return await login(ws, user_id, server_id, session_id, token);
    case VoiceStates.RESUME:
        return await resume(ws, user_id, server_id, token);
    }
}

async function close(event: WebSocket.CloseEvent, endpoint: string, token: string, session_id: string, user_id: SnowflakeData, server_id: SnowflakeData) {
    clearInterval(heartbeatIDs.get(server_id));
    if (event.code < 4000 || event.code === 4015) {
        states.set(server_id, VoiceStates.RESUME);
    } else if (event.code === 4006 || event.code === 4009) {
        states.set(server_id, VoiceStates.OPEN);
    } else {
        clients.delete(server_id);
        states.delete(server_id);
        heartbeatIDs.delete(server_id);
        ssrcs.delete(server_id);
        udpSends.delete(server_id);
        return;
    }
    clients.set(server_id, ws(endpoint, token, session_id, server_id, user_id));
}

async function error(server_id: SnowflakeData) {
    clients.delete(server_id);
    states.delete(server_id);
    heartbeatIDs.delete(server_id);
    ssrcs.delete(server_id);
    udpSends.delete(server_id);
}

async function message(ws: WebSocket.WebSocket, event: WebSocket.MessageEvent, server_id: SnowflakeData) {
    let data: DiscordData = JSON.parse(event.data as string);
    switch (data.op) {
    case VoiceOpcode.Ready:
        return await ready(ws, data, server_id);
    case VoiceOpcode.SessionDescription:
        return await sessionDescription(data, server_id);
    case VoiceOpcode.Hello:
        return await keepAlive(ws, data.d.heart_interval, server_id);
    case VoiceOpcode.ClientDisconnect:
        return await destroy(ws);
    }
}

async function login(ws: WebSocket.WebSocket, user_id: SnowflakeData, server_id: SnowflakeData, session_id: string, token: string) {
    states.set(server_id, VoiceStates.LOGIN);
    return await send(ws, {
        op: VoiceOpcode.Identity,
        d: {
            server_id: server_id.toString(),
            user_id: user_id.toString(),
            session_id,
            token
        }
    });
}

async function resume(ws: WebSocket.WebSocket, user_id: SnowflakeData, server_id: SnowflakeData, token: string) {
    states.set(server_id, VoiceStates.OPEN);
    return await send(ws, {
        op: VoiceOpcode.Resume,
        d: {
            server_id: server_id.toString(),
            user_id: user_id.toString(),
            token
        }
    });
}

async function ready(ws: WebSocket.WebSocket, data: DiscordData, server_id: SnowflakeData) {
    let { modes, ip, port, ssrc: _ssrc } = data.d;
    let _udp = await udp(ip, port, _ssrc, server_id);

    udpSends.set(server_id, _udp.send);
    ssrcs.set(server_id, _ssrc);

    _udp.set(await selectProtocol(ws, modes, _udp.config, server_id));
    states.set(server_id, VoiceStates.READY)
}

async function selectProtocol(ws: WebSocket.WebSocket, modes: string[], config: {
    ip: string;
    port: number;
}, server_id: SnowflakeData) {
    let valids = [
        "xsalsa20_poly1305",
        "xsalsa20_poly1305_suffix"
    ];
    let mode = modes.find(v => valids.includes(v));
    if (!mode)
        throw new NoneValidEncryptionMode(modes);
    
    states.set(server_id, VoiceStates.SELECT)
    await send(ws, {
        op: VoiceOpcode.SelectProtocol,
        d: {
            protocol: "udp",
            data: {
                address: config.ip,
                port: config.port,
                mode
            }
        }
    });
    return mode;
}

async function sessionDescription(data: DiscordData, server_id: SnowflakeData) {
    let send = udpSends.get(server_id);
    return udpSends.set(server_id, async function(_data: Buffer) {
        return await send(_data, data.d.secret_key);
    });
}

async function keepAlive(ws: WebSocket.WebSocket, heartbeat: number, server_id: SnowflakeData) {
    return heartbeatIDs.set(server_id, setInterval(async () => {
        await send(ws, {
            op: VoiceOpcode.Heartbeat,
            d: Date.now()
        });
    }, heartbeat));
}

async function setSpeaking(ws: WebSocket.WebSocket, server_id: SnowflakeData) {
    return await send(ws, {
        op: VoiceOpcode.Speaking,
        d: {
            speaking: 5,
            delay: 0,
            ssrc: ssrcs.get(server_id)
        }
    });
}

async function destroy(ws: WebSocket.WebSocket) {
    ws.close(4000);
}

export async function sendPacket(server_id: SnowflakeData, data: Buffer) {
    let send = udpSends.get(server_id);
    await send(data);
}