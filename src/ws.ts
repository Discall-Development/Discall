import WebSocket from "ws";
import {pack, unpack} from "etf.js";
import {debug, error, message} from "./logger";
import {
    ActivityData,
    DiscordData,
    Opcode,
    ReadyEventData,
    SnowflakeData,
    VoiceServerUpdateEventData,
    WSObject,
} from "./dataType";
import {callEvent, packEvent} from "./event";
import {createVoiceWS} from "./voice";

let Global: {
    heartbeatID: any;
    session_id: string | null;
    sequence: number | null;
    user_id: SnowflakeData | null;
    identified: boolean;
} = {
    heartbeatID: 0,
    session_id: null,
    sequence: null,
    user_id: null,
    identified: false,
};

type Version = 9 | 10
export function createWS(
    token: string,
    intents: number,
    version: Version = 10,
    resume: boolean = false
): WSObject {
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
            let obj = createVoiceWS(
                data.endpoint,
                Global.user_id as SnowflakeData,
                data.token,
                data.guild_id,
                Global.session_id as string
            );
        }
    });

    return {
        ws,
        events: {
            ready: packEvent("ready"),
            resumed: packEvent("resumed"),
            application_command_permissions_update: packEvent(
                "application_command_permissions_update"
            ),
            channel_create: packEvent("channel_create"),
            channel_update: packEvent("channel_update"),
            channel_delete: packEvent("channel_delete"),
            channel_pins_update: packEvent("channel_pins_update"),
            thread_create: packEvent("thread_create"),
            thread_update: packEvent("thread_update"),
            thread_delete: packEvent("thread_delete"),
            thread_list_sync: packEvent("thread_list_sync"),
            thread_member_update: packEvent("thread_member_update"),
            thread_members_update: packEvent("thread_members_update"),
            guild_create: packEvent("guild_create"),
            guild_update: packEvent("guild_update"),
            guild_delete: packEvent("guild_delete"),
            guild_ban_add: packEvent("guild_ban_add"),
            guild_ban_remove: packEvent("guild_ban_remove"),
            guild_emojis_update: packEvent("guild_emojis_update"),
            guild_stickers_update: packEvent("guild_stickers_update"),
            guild_integrations_update: packEvent("guild_integrations_update"),
            guild_member_add: packEvent("guild_member_add"),
            guild_member_remove: packEvent("guild_member_remove"),
            guild_member_update: packEvent("guild_member_update"),
            guild_member_chunk: packEvent("guild_member_chunk"),
            guild_role_create: packEvent("guild_role_create"),
            guild_role_update: packEvent("guild_role_update"),
            guild_role_delete: packEvent("guild_role_delete"),
            guild_scheduled_event_create: packEvent("guild_scheduled_event_create"),
            guild_scheduled_event_update: packEvent("guild_scheduled_event_update"),
            guild_scheduled_event_delete: packEvent("guild_scheduled_event_delete"),
            guild_scheduled_event_user_add: packEvent("guild_scheduled_event_user_add"),
            guild_scheduled_event_user_remove: packEvent("guild_scheduled_event_user_remove"),
            integration_create: packEvent("integration_create"),
            integration_update: packEvent("integration_update"),
            integration_delete: packEvent("integration_delete"),
            interaction_create: packEvent("interaction_create"),
            invite_create: packEvent("invite_create"),
            invite_delete: packEvent("invite_delete"),
            message_create: packEvent("message_create"),
            message_update: packEvent("message_update"),
            message_delete: packEvent("message_delete"),
            message_delete_bulk: packEvent("message_delete_bulk"),
            message_reaction_add: packEvent("message_reaction_add"),
            message_reaction_remove: packEvent("message_reaction_remove"),
            message_reaction_remove_all: packEvent("message_reaction_remove_all"),
            message_reaction_remove_emoji: packEvent("message_reaction_remove_emoji"),
            presence_update: packEvent("presence_update"),
            stage_instance_create: packEvent("stage_instance_create"),
            stage_instance_delete: packEvent("stage_instance_delete"),
            stage_instance_update: packEvent("state_instance_update"),
            typing_start: packEvent("typing_start"),
            user_update: packEvent("user_update"),
            voice_state_update: packEvent("voice_state_update"),
            voice_server_update: packEvent("voice_server_update"),
            webhooks_update: packEvent("webhooks_update"),
        },
        gateway_commands: {
            getMember: packCommand(ws, RequestGuildMembers),
            setPresence: packCommand(ws, PresenceUpdate),
            setVoiceState: packCommand(ws, VoiceStateUpdate),
        },
    };
}

async function onOpen(
    ws: WebSocket,
    event: WebSocket.Event,
    token: string,
    intents: number,
    version: Version,
    resume: boolean
): Promise<void> {
    debug("websocket opened");
    if (!resume)
        await Identity(ws, token, intents);
    if (resume)
        await Resume(ws, token, intents, version, resume);
}

async function onClose(
    ws: WebSocket,
    event: WebSocket.CloseEvent,
    token: string,
    intents: number,
    version: Version
): Promise<void> {
    debug("websocket closed");

    message(`close code: ${event.code}`);
    if (event.code < 4000 || event.code === 4015) {
        clearInterval(Global.heartbeatID);
        return await Resume(ws, token, intents, version, false);
    }

    process.exit();
}

async function onError(
    ws: WebSocket,
    event: WebSocket.ErrorEvent
): Promise<void> {
    error("websocket failed");
    message(`Error message: ${event.message}`);
    process.exit(1);
}

async function onMessage(
    ws: WebSocket,
    event: WebSocket.MessageEvent
): Promise<void> {
    let data: DiscordData = decode(event.data as Buffer);
    if (data.s) Global.sequence = data.s;

    await processData(ws, data);
}

function decode(data: Buffer): DiscordData {
    return unpack(data) as DiscordData;
}

function encode(data: DiscordData): Buffer {
    return pack(data as unknown) as Buffer;
}

async function processData(ws: WebSocket, data: DiscordData): Promise<void> {
    // if (data.op !== 0) console.log(data);
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
    await send(ws, {...data, d: Global.sequence});
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
                browser: "disfunc",
                device: "disfunc",
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

async function Reconnect(data: DiscordData): Promise<void> {}

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

async function HeartbeatACK(data: DiscordData): Promise<void> {}
