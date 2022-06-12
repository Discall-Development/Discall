import WebSocket from "ws";
import {pack, unpack} from "etf.js";
import {debug, error} from "./logger";
import {DiscordData, Opcode, WSObject} from "./dataType";

type Encoding = 'etf' | 'json';

let Global: {
    sequence: number | null;
    session_id: string | null;
    events: { [k: string]: ((...item: any) => Promise<any>)[] };
} = {
    sequence: null,
    session_id: null,
    events: {}
}
export function createWS(
    token: string,
    intents: number,
    version: 8 | 9 = 9,
    encoding: Encoding = 'etf'
): WSObject {
    let wsUri = `wss://gateway.discord.gg?v=${version}&encoding=${encoding}`;

    let ws = new WebSocket(wsUri);
    ws.onopen = (data) => onOpen(ws, data, token, intents, encoding);
    ws.onclose = onClose;
    ws.onerror = onError;
    ws.onmessage = (data) => onMessage(ws, data, encoding);

    return {
        ws,
        events: {
            ready: packEvent('ready'),
            resumed: packEvent('resumed'),
            application_command_permissions_update: packEvent('application_command_permissions_update'),
            channel_create: packEvent('channel_create'),
            channel_update: packEvent('channel_update'),
            channel_delete: packEvent('channel_delete'),
            channel_pins_update: packEvent('channel_pins_update'),
            thread_create: packEvent('thread_create'),
            thread_update: packEvent('thread_update'),
            thread_delete: packEvent('thread_delete'),
            thread_list_sync: packEvent('thread_list_sync'),
            thread_member_update: packEvent('thread_member_update'),
            thread_members_update: packEvent('thread_members_update'),
            guild_create: packEvent('guild_create'),
            guild_update: packEvent('guild_update'),
            guild_delete: packEvent('guild_delete'),
            guild_ban_add: packEvent('guild_ban_add'),
            guild_ban_remove: packEvent('guild_ban_remove'),
            guild_emojis_update: packEvent('guild_emojis_update'),
            guild_stickers_update: packEvent('guild_stickers_update'),
            guild_integrations_update: packEvent('guild_integrations_update'),
            guild_member_add: packEvent('guild_member_add'),
            guild_member_remove: packEvent('guild_member_remove'),
            guild_member_update: packEvent('guild_member_update'),
            guild_member_chunk: packEvent('guild_member_chunk'),
            guild_role_create: packEvent('guild_role_create'),
            guild_role_update: packEvent('guild_role_update'),
            guild_role_delete: packEvent('guild_role_delete'),
            guild_scheduled_event_create: packEvent('guild_scheduled_event_create'),
            guild_scheduled_event_update: packEvent('guild_scheduled_event_update'),
            guild_scheduled_event_delete: packEvent('guild_scheduled_event_delete'),
            guild_scheduled_event_user_add: packEvent('guild_scheduled_event_user_add'),
            guild_scheduled_event_user_remove: packEvent('guild_scheduled_event_user_remove'),
            integration_create: packEvent('integration_create'),
            integration_update: packEvent('integration_update'),
            integration_delete: packEvent('integration_delete'),
            interaction_create: packEvent('interaction_create'),
            invite_create: packEvent('invite_create'),
            invite_delete: packEvent('invite_delete'),
            message_create: packEvent('message_create'),
            message_update: packEvent('message_update'),
            message_delete: packEvent('message_delete'),
            message_delete_bulk: packEvent('message_delete_bulk'),
            message_reaction_add: packEvent('message_reaction_add'),
            message_reaction_remove: packEvent('message_reaction_remove'),
            message_reaction_remove_all: packEvent('message_reaction_remove_all'),
            message_reaction_remove_emoji: packEvent('message_reaction_remove_emoji'),
            presence_update: packEvent('presence_update'),
            stage_instance_create: packEvent('stage_instance_create'),
            stage_instance_delete: packEvent('stage_instance_delete'),
            stage_instance_update: packEvent('state_instance_update'),
            typing_start: packEvent('typing_start'),
            user_update: packEvent('user_update'),
            voice_state_update: packEvent('voice_state_update'),
            voice_server_update: packEvent('voice_server_update'),
            webhooks_update: packEvent('webhooks_update')
        }
    };
}

function packEvent(eventName: string): (cb: () => Promise<any>) => any {
    return function(cb: () => Promise<any>): any {
        if (Array.isArray(Global.events[eventName]))
            Global.events[eventName].push(cb);
        else
            Global.events[eventName] = [cb];
    };
}

async function onOpen(ws: WebSocket, event: WebSocket.Event, token: string, intents: number, encoding: Encoding): Promise<void> {
    debug('websocket opened');
    await Identity(ws, token, intents, encoding);
}

async function onClose(event: WebSocket.CloseEvent): Promise<void> {
    debug('websocket closed');
    process.exit();
}

async function onError(event: WebSocket.ErrorEvent): Promise<void> {
    error('websocket failed');
    process.exit(1);
}

async function onMessage(ws: WebSocket, event: WebSocket.MessageEvent, encoding: Encoding): Promise<void> {
    let data: DiscordData;
    if (encoding == 'json')
        data = JSON.parse(event.data as string);
    else
        data = decode(event.data as Buffer);

    if (data.s !== undefined)
        Global.sequence = data.s;

    await processData(ws, encoding, data);
}

function decode(data: Buffer): DiscordData {
    return unpack(data) as DiscordData;
}

function encode(data: DiscordData): Buffer {
    return pack(data as unknown) as Buffer;
}

async function processData(ws: WebSocket, encoding: Encoding, data: DiscordData): Promise<void> {
    switch (data.op) {
        case Opcode.Dispatch:
            return await Dispatch(data);
        case Opcode.Heartbeat:
            return await Heartbeat(ws, data, encoding);
        case Opcode.Reconnect:
            return await Reconnect(data);
        case Opcode.InvalidSession:
            return await InvalidSession(data);
        case Opcode.Hello:
            return await Hello(ws, data, encoding);
        case Opcode.HeartbeatACK:
            return await HeartbeatACK(data);
    }
}

async function send(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {
    if (encoding == 'etf')
        ws.send(encode(data));
    else
        ws.send(JSON.stringify(data));
}

async function Dispatch(data: DiscordData): Promise<void> {
    // console.log(data.t?.toLowerCase())
    if (data.t !== undefined && Global.events[data.t.toLowerCase()] !== undefined)
        for (const cb of Global.events[data.t.toLowerCase()]) {
            await cb(data.d);
        }
}

async function Heartbeat(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {
    await send(ws, { ...data, d: Global.sequence }, encoding);
}

async function Identity(ws: WebSocket, token: string, intents: number, encoding: Encoding): Promise<void> {
    await send(ws, {
        op: 2,
        d: {
            token,
            intents,
            properties: {
                $os: 'linux',
                $browser: 'discall',
                $device: 'discall'
            }
        }
    }, encoding);
}

async function PresenceUpdate(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {

}

async function VoiceStateUpdate(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {

}

async function Resume(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {

}

async function Reconnect(data: DiscordData): Promise<void> {

}

async function RequestGuildMembers(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {

}

async function InvalidSession(data: DiscordData): Promise<void> {

}

async function Hello(ws: WebSocket, data: DiscordData, encoding: Encoding): Promise<void> {
    setInterval(Heartbeat, data.d.heartbeat_interval, ws, { op: 1 }, encoding);
}

async function HeartbeatACK(data: DiscordData): Promise<void> {
    debug('heartbeat ACK received');
}