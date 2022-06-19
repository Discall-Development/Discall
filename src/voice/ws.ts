import {createUDP} from "./UDP";

import WebSocket from "ws";
import {DiscordData, SnowflakeData, VoiceOpcode} from "../dataType";
import {debug} from "../logger";
import {NoneValidEncryptionMode} from "../errors";

let Global: {
    UDPSend: ((buf: Buffer, secret: Uint8Array) => any) | ((buf: Buffer) => any);
    UDPSetMode: (mode: string) => any;
} = {
    UDPSend: (buf: Buffer) => buf,
    UDPSetMode: (mode: string) => mode
}
export function createVoiceWS(endpoint: string, user_id: SnowflakeData, token: string, server_id: SnowflakeData, session_id: string) {
    let ws = new WebSocket(`wss://${endpoint}/?v=4`);

    ws.onopen = (event) => onOpen(ws, user_id, token, server_id, session_id, event);
    ws.onclose = (event) => onClose(ws, token, server_id, session_id, event);
    ws.onerror = (event) => onError(ws, event);
    ws.onmessage = (event) => onMessage(ws, event);

    return {
        ws
    }
}

async function onOpen(ws: WebSocket, user_id: SnowflakeData, token: string, server_id: SnowflakeData, session_id: string, event: WebSocket.Event) {
    debug('voice websocket opened');
    await Identify(ws, user_id, token, server_id, session_id);
}

async function onClose(ws: WebSocket, token: string, server_id: SnowflakeData, session_id: string, event: WebSocket.CloseEvent) {
    debug('voice websocket closed');
    if (event.code === 1000 || event.code === 1001) {
        ws.resume();
        await Resume(ws, token, server_id, session_id);
    }
}

async function onError(ws: WebSocket, event: WebSocket.ErrorEvent) {
    debug('voice websocket failed');
}

async function onMessage(ws: WebSocket, event: WebSocket.MessageEvent) {
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
            return await Speaking(ws, data);
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

async function Identify(ws: WebSocket, user_id: SnowflakeData, token: string, server_id: SnowflakeData, session_id: string) {
    await send(ws, {
        op: VoiceOpcode.Identity,
        d: {
            server_id: server_id.toString(),
            user_id: user_id.toString(),
            session_id,
            token
        }
    });
}

async function SelectProtocol(ws: WebSocket, modes: string[], ip: string, port: number) {
    let validOptions = ['xsalsa20_poly1305', 'xsalsa20_poly1305_lite', 'xsalsa20_poly1305_suffix'];
    let option = modes.find((option) => validOptions.includes(option));
    if (!option)
        throw new NoneValidEncryptionMode(modes);

    Global.UDPSetMode(option);
    await send(ws, {
        op: VoiceOpcode.SelectProtocol,
        d: {
            protocol: 'udp',
            data: {
                address: ip,
                port,
                mode: option
            }
        }
    });
}

async function Ready(ws: WebSocket, data: DiscordData) {
    let { modes, ip, port, ssrc } = data.d;
    let { send, setMode, config } = await createUDP(ip, port, ssrc);

    Global.UDPSend = send;
    Global.UDPSetMode = setMode;
    await SelectProtocol(ws, modes, config.ip, config.port);
}

async function Heartbeat(ws: WebSocket, data: DiscordData) {
    await send(ws, { ...data, d: Date.now() });
}

async function SessionDescription(ws: WebSocket, data: DiscordData) {
    let _send = Global.UDPSend;
    Global.UDPSend = async function(buf: Buffer) {
        await _send(buf, data.d.secret_key);
    }
}

async function Speaking(ws: WebSocket, data: DiscordData) {

}

async function HeartbeatACK(ws: WebSocket, data: DiscordData) {}

async function Resume(ws: WebSocket, token: string, server_id: SnowflakeData, session_id: string) {
    await send(ws, {
        op: VoiceOpcode.Resume,
        d: {
            server_id,
            session_id,
            token
        }
    });
}

async function Hello(ws: WebSocket, data: DiscordData) {
    setInterval(Heartbeat, data.d.heartbeat_interval, ws, { op: VoiceOpcode.Heartbeat });
}

async function Resumed(ws: WebSocket, data: DiscordData) {

}

async function ClientDisconnect(ws: WebSocket, data: DiscordData) {

}