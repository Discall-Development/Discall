import {DiscordData, SnowflakeData, VoiceOpcode} from "../dataType";
import {debug} from "../logger";
import {NoneValidEncryptionMode} from "../errors";
import {createUDP} from "./UDP";
import * as JSON from "json-bigint";

let Global: {
    heartbeatID: any;
    ssrc: number;
    UDPSend: ((buf: Buffer, secret: Uint8Array) => any) | ((buf: Buffer) => any);
    UDPSetMode: (mode: string) => any;
} = {
    heartbeatID: 0,
    ssrc: 0,
    UDPSend: (buf: Buffer) => buf,
    UDPSetMode: (mode: string) => mode,
};

export function createVoiceWS(
    endpoint: string,
    user_id: SnowflakeData,
    token: string,
    server_id: SnowflakeData,
    session_id: string,
    resume: boolean = false
) {
    let ws = new WebSocket(`wss://${endpoint}/?v=4`);

    ws.onopen = (_) => onOpen(ws, user_id, token, server_id, session_id, resume, endpoint);
    ws.onclose = (event) => onClose(ws, event, token, server_id, session_id, endpoint, user_id);
    ws.onerror = (event) => onError(ws, event);
    ws.onmessage = (event) => onMessage(ws, event);
}

async function onOpen(
    ws: WebSocket,
    user_id: SnowflakeData,
    token: string,
    server_id: SnowflakeData,
    session_id: string,
    resume: boolean,
    endpoint: string
) {
    if (!resume)
        await Identify(ws, user_id, token, server_id, session_id);
    if (resume)
        await Resume(ws, token, server_id, session_id, resume, endpoint, user_id);
}

async function onClose(
    ws: WebSocket,
    event: CloseEvent,
    token: string,
    server_id: SnowflakeData,
    session_id: string,
    endpoint: string,
    user_id: SnowflakeData
) {
    if (event.code < 4000 || event.code === 4015) {
        clearInterval(Global.heartbeatID);
        return await Resume(ws, token, server_id, session_id, true, endpoint, user_id);
    }
}

async function onError(ws: WebSocket, event: Event) {
    debug("voice websocket failed");
}

async function onMessage(ws: WebSocket, event: MessageEvent) {
    let data: DiscordData = decode(event.data as string);
    await processData(ws, data);
}

async function processData(ws: WebSocket, data: DiscordData) {
    switch (data.op) {
    case VoiceOpcode.Ready:
        return await Ready(ws, data);
    case VoiceOpcode.SessionDescription:
        return await SessionDescription(ws, data);
    case VoiceOpcode.Speaking:
        return await Speaking(ws);
    case VoiceOpcode.HeartbeatACK:
        return await HeartbeatACK(ws, data);
    case VoiceOpcode.Hello:
        return await Hello(ws, data);
    case VoiceOpcode.Resumed:
        return await Resumed(ws, data);
    case VoiceOpcode.ClientDisconnect:
        return await ClientDisconnect(ws, data);
    }
}

async function send(ws: WebSocket, data: DiscordData) {
    ws.send(encode(data));
}

function decode(data: string): DiscordData {
    return JSON.parse(data);
}

function encode(data: DiscordData): string {
    return JSON.stringify(data);
}

async function Identify(
    ws: WebSocket,
    user_id: SnowflakeData,
    token: string,
    server_id: SnowflakeData,
    session_id: string
) {
    await send(ws, {
        op: VoiceOpcode.Identity,
        d: {
            server_id: server_id.toString(),
            user_id: user_id.toString(),
            session_id,
            token,
        },
    });
}

async function SelectProtocol(
    ws: WebSocket,
    modes: string[],
    ip: string,
    port: number
) {
    let validOptions = [
        "xsalsa20_poly1305",
        "xsalsa20_poly1305_lite",
        "xsalsa20_poly1305_suffix",
    ];
    let option = modes.find((option) => validOptions.includes(option));
    if (!option) throw new NoneValidEncryptionMode(modes);

    Global.UDPSetMode(option);
    await send(ws, {
        op: VoiceOpcode.SelectProtocol,
        d: {
            protocol: "udp",
            data: {
                address: ip,
                port,
                mode: option,
            },
        },
    });
}

async function Ready(ws: WebSocket, data: DiscordData) {
    let {modes, ip, port, ssrc} = data.d;
    let {send, setMode, config} = await createUDP(ip, port, ssrc);

    Global.UDPSend = send;
    Global.UDPSetMode = setMode;
    Global.ssrc = ssrc;

    await SelectProtocol(ws, modes, config.ip, config.port);
}

async function Heartbeat(ws: WebSocket, data: DiscordData) {
    await send(ws, {...data, d: Date.now()});
}

async function SessionDescription(ws: WebSocket, data: DiscordData) {
    let _send = Global.UDPSend;
    Global.UDPSend = async function (buf: Buffer) {
        await _send(buf, data.d.secret_key);
    };
}

async function Speaking(ws: WebSocket) {
    await send(ws, {
        op: VoiceOpcode.Speaking,
        d: {
            speaking: 5,
            delay: 0,
            ssrc: Global.ssrc,
        },
    });
}

async function HeartbeatACK(ws: WebSocket, data: DiscordData) {}

async function Resume(
    ws: WebSocket,
    token: string,
    server_id: SnowflakeData,
    session_id: string,
    resume: boolean,
    endpoint: string,
    user_id: SnowflakeData
) {
    if (!resume)
        createVoiceWS(endpoint, user_id, token, server_id, session_id, true);
    if (resume)
        await send(ws, {
            op: VoiceOpcode.Resume,
            d: {
                server_id: server_id.toString(),
                user_id: user_id.toString(),
                token,
            },
        });
}

async function Hello(ws: WebSocket, data: DiscordData) {
    Global.heartbeatID = setInterval(Heartbeat, data.d.heartbeat_interval, ws, {
        op: VoiceOpcode.Heartbeat,
    });
}

async function Resumed(ws: WebSocket, data: DiscordData) {
    debug("voice websocket resumed.");
}

async function ClientDisconnect(ws: WebSocket, data: DiscordData) {}
