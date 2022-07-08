import { pack, unpack } from "etf.js";
import { error, message } from "./logger";
import {
    ActivityData,
    DiscordData,
    Opcode,
    ReadyEventData,
    SnowflakeData,
    VoiceServerUpdateEventData,
    WSObject,
} from "./dataType";
import { callEvent, packEvent } from "./event";
import { createVoiceWS } from "./voice";
import { VersionError } from "./errors";

let Global: {
    heartbeatID?: any;
    session_id: string | null;
    sequence: number | null;
    user_id: SnowflakeData | null;
} = {
    session_id: null,
    sequence: null,
    user_id: null,
};

type Version = 9 | 10;
export function createWS(
    token: string,
    intents: number,
    version: Version = 10,
    resume: boolean = false
): WSObject {
    // @ts-ignore
    if (version !== 9 && version !== 10)
        throw new VersionError(version);

    let ws = new WebSocket(`wss://gateway.discord.gg?v=${version}&encoding=etf`);

    ws.onopen = (data) => onOpen(ws, data, token, intents, version, resume);
    ws.onclose = (data) => onClose(ws, data, token, intents, version);
    ws.onerror = (data) => onError(ws, data);
    ws.onmessage = (data) => onMessage(ws, data);

    packEvent("ready")(async (data: ReadyEventData) => {
        Global.session_id = data.session_id;
        Global.user_id = data.user.id;
    });

    packEvent("voice_server_update")(async (data: VoiceServerUpdateEventData) => {
        if (data.endpoint) {
            createVoiceWS(
                data.endpoint,
                Global.user_id as SnowflakeData,
                data.token,
                data.guild_id,
                Global.session_id as string
            );
        }
    });

    return {
        gateway_commands: {
            getMember: packCommand(ws, RequestGuildMembers),
            setPresence: packCommand(ws, PresenceUpdate),
            setVoiceState: packCommand(ws, VoiceStateUpdate),
        },
    };
}

async function onOpen(
    ws: WebSocket,
    event: Event,
    token: string,
    intents: number,
    version: Version,
    resume: boolean
): Promise<void> {
    console.log("websocket connected");
    if (!resume)
        await Identity(ws, token, intents);
    if (resume)
        await Resume(ws, token, intents, version, resume);
}

async function onClose(
    ws: WebSocket,
    event: CloseEvent,
    token: string,
    intents: number,
    version: Version
): Promise<void> {
    if (event.code < 4000 || event.code === 4015) {
        clearInterval(Global.heartbeatID);
        return await Resume(ws, token, intents, version, false);
    }

    process.exit();
}

async function onError(
    ws: WebSocket,
    event: Event
): Promise<void> {
    error("websocket failed");
    message(`Error message: ${event}`);
    process.exit(1);
}

async function onMessage(
    ws: WebSocket,
    event: MessageEvent
): Promise<void> {
    let data: DiscordData = decode(Buffer.from(event.data));
    if (data.s) Global.sequence = data.s;
    console.log(data);

    await processData(ws, data);
}

function decode(data: Buffer): DiscordData {
    return unpack(data) as DiscordData;
}

function encode(data: DiscordData): Buffer {
    return pack(data as unknown) as Buffer;
}

async function processData(ws: WebSocket, data: DiscordData): Promise<void> {
    switch (data.op) {
    case Opcode.Dispatch:
        return await Dispatch(data);
    case Opcode.Heartbeat:
        return await Heartbeat(ws, data);
    case Opcode.Reconnect:
        return await Reconnect(data);
    case Opcode.InvalidSession:
        return await InvalidSession(ws, data);
    case Opcode.Hello:
        return await Hello(ws, data);
    case Opcode.HeartbeatACK:
        return await HeartbeatACK(data);
    }
}

async function send(ws: WebSocket, data: DiscordData): Promise<void> {
    ws.send(encode(data));
}

function packCommand(
    ws: WebSocket,
    cb: (...parma: any) => Promise<void>
): (...params: any) => Promise<void> {
    return async function (...params: any) {
        return await cb(ws, ...params);
    };
}

async function Dispatch(data: DiscordData): Promise<void> {
    await callEvent(data.t as string, data.d);
}

async function Heartbeat(ws: WebSocket, data: DiscordData): Promise<void> {
    await send(ws, { ...data, d: Global.sequence });
}

async function Identity(
    ws: WebSocket,
    token: string,
    intents: number
): Promise<void> {
    await send(ws, {
        op: Opcode.Identity,
        d: {
            token,
            intents,
            properties: {
                os: "linux",
                browser: "discall",
                device: "discall",
            },
        },
    });
}

async function PresenceUpdate(
    ws: WebSocket,
    since: number | null,
    activities: ActivityData[],
    status: string,
    afk: boolean
): Promise<void> {
    await send(ws, {
        op: Opcode.PresenceUpdate,
        d: {
            since,
            activities,
            status,
            afk,
        },
    });
}

async function VoiceStateUpdate(
    ws: WebSocket,
    guild_id: SnowflakeData,
    channel_id: SnowflakeData | null,
    mute: boolean,
    deaf: boolean
): Promise<void> {
    await send(ws, {
        op: Opcode.VoiceStateUpdate,
        d: {
            guild_id,
            channel_id,
            self_mute: mute,
            self_deaf: deaf,
        },
    });
}

async function Resume(ws: WebSocket, token: string, intents: number, version: Version, resume: boolean): Promise<void> {
    if (!resume)
        createWS(token, intents, version, true);
    else
        await send(ws, {
            op: Opcode.Resume,
            d: {
                token,
                session_id: Global.session_id,
                seq: Global.sequence,
            },
        });
}

async function Reconnect(data: DiscordData): Promise<void> { }

async function RequestGuildMembers(
    ws: WebSocket,
    guild_id: SnowflakeData,
    limit: number = 0,
    type: "search" | "get",
    param: any,
    presences?: boolean,
    nonce?: string
): Promise<void> {
    let data: {
        guild_id: SnowflakeData;
        query?: string;
        limit: number;
        presences?: boolean;
        user_ids?: SnowflakeData | SnowflakeData[];
        nonce?: string;
    } = {
        guild_id,
        limit,
    };

    switch (type) {
    case "get":
        data.user_ids = param;
        break;
    case "search":
        data.query = param;
        break;
    }

    if (presences !== undefined) data.presences = presences;

    if (nonce !== undefined) data.nonce = nonce;

    await send(ws, {
        op: Opcode.RequestGuildMember,
        d: data,
    });
}

async function InvalidSession(ws: WebSocket, data: DiscordData): Promise<void> {
    if (data.d !== null && data.d !== undefined) {
        if (data.d) ws.close(1000);
        else process.exit(1);
    } else process.exit(1);
}

async function Hello(ws: WebSocket, data: DiscordData): Promise<void> {
    Global.heartbeatID = setInterval(Heartbeat, data.d.heartbeat_interval, ws, {
        op: Opcode.Heartbeat,
    });
}

async function HeartbeatACK(data: DiscordData): Promise<void> { }