import pipe from '@discall/simple-pipe';
import { WebSocket } from './runtimeModule';
import { DiscordData, Opcode } from '@discall/types';

const GATEWAY_VERSION = 10;
const GATEWAY_ENCODING = 'json';
const DEFAULT_GATEWAY_BASE = 'wss://gateway.discord.gg';
let GATEWAY_BASE = DEFAULT_GATEWAY_BASE;

enum State {
    OPEN = 1,
    CLOSE,
    ERROR,
    RESUME,
    LOGIN
}

interface WS extends WebSocket.WebSocket {
    onopen: () => Promise<void>;
    onclose: (event: WebSocket.CloseEvent) => Promise<WS>;
    onerror: () => Promise<void>;
    onmessage: (event: WebSocket.MessageEvent) => Promise<DiscordData>;
}

let state: State;
let sequence: number | null = null;
let session_id: string;
let heartbeatID: NodeJS.Timer;
export default function ws(token: string, intents: number): WS {
    const ws = new WebSocket.WebSocket(`${GATEWAY_BASE}?v=${GATEWAY_VERSION}&encoding=${GATEWAY_ENCODING}`);
    if (!state)
        state = State.OPEN;

    ws.onopen = () => open(ws, token, intents, session_id);
    ws.onclose = (event: WebSocket.CloseEvent) => close(event, token, intents);
    ws.onerror = () => error();
    ws.onmessage = (event: WebSocket.MessageEvent) => message(ws, event);

    return ws as WS;
}

export async function send(ws: WebSocket.WebSocket, data: unknown) {
    return await pipe(data)
        .pipe(JSON.stringify)
        .pipe(ws.send.bind(ws))
        .execute();
}

async function open(ws: WebSocket.WebSocket, token: string, intents: number, session_id: string): Promise<void> {
    switch (state) {
    case State.OPEN:
        return await login(ws, token, intents);
    case State.RESUME:
        return await resume(ws, token, session_id);
    }
}

async function close(event: WebSocket.CloseEvent, token: string, intents: number) {
    clearInterval(heartbeatID);
    if (event.code < 4000 || event.code === 4015)
        state = State.RESUME;
    else if (event.code === 4009)
        state = State.OPEN;
    else
        process.exit(0);

    return ws(token, intents);
}

async function error() {
    process.exit(1);
}

async function message(ws: WebSocket.WebSocket, event: WebSocket.MessageEvent): Promise<DiscordData> {
    const data = JSON.parse(event.data as string) as DiscordData;
    switch (data.op) {
    case Opcode.Dispatch:
        if (data.t === 'READY')
            GATEWAY_BASE = (data.d as { resume_gateway_url: string }).resume_gateway_url;

        sequence = data.s as number;
        break;
    case Opcode.InvalidSession:
        process.exit(1);
        break;
    case Opcode.Hello:
        await keepAlive(ws, (data.d as { heartbeat_interval: number }).heartbeat_interval);
    }

    return data;
}

async function login(ws: WebSocket.WebSocket, token: string, intents: number) {
    return await send(ws, {
        op: Opcode.Identity,
        d: {
            token,
            intents,
            properties: {
                os: 'linux',
                browser: 'discall',
                device: 'discall',
            },
        }
    });
}

async function resume(ws: WebSocket.WebSocket, token: string, session_id: string) {
    return await send(ws, {
        op: Opcode.Resume,
        d: {
            token,
            session_id: session_id,
            seq: sequence,
        }
    });
}

async function keepAlive(ws: WebSocket.WebSocket, heartbeat: number): Promise<NodeJS.Timer> {
    return heartbeatID = setInterval(async () => {
        await send(ws, {
            op: Opcode.Heartbeat,
            d: sequence
        });
    }, heartbeat);
}
