import commander from './command';
import listener from './event';
import ws, { send } from './ws';
import { CreateBotError } from './error';
import voice from './voice/ws';
import client from './https';
import { ActivityData, DiscordData, HttpRequest, isHttpRequest, Opcode, SnowflakeData } from '@discall/types';
import { WebSocket } from './runtimeModule';

export default function bot(token: string, {
    intents, prefix
}: {
    intents: number;
    prefix?: string;
}) {
    if (intents === undefined)
        throw new CreateBotError('intents');

    if (token.split('.').length !== 3)
        throw new CreateBotError('token');

    let _ws = ws(token, intents);
    if (prefix)
        _ws = commander(_ws, prefix);

    _ws = listener(_ws);
    _ws = voice(_ws);

    let close = _ws.onclose;
    _ws.onclose = async (event) => {
        _ws = await close(event);
        close = _ws.onclose;

        return _ws;
    };

    const send = client(token, _ws);
    return async function(packet: HttpRequest | DiscordData) {
        if (isHttpRequest(packet))
            return await send(packet);

        switch (packet.op) {
        case Opcode.VoiceStateUpdate:
            return connectChannel(_ws, packet.d as VoiceState);
        case Opcode.PresenceUpdate:
            return updatePresence(_ws, packet.d as ClientPresence);
        case Opcode.RequestGuildMember:
            return requestGuildMember(_ws, packet.d as RequestMember);
        }
    };
}

interface VoiceState {
    guild_id: SnowflakeData;
    channel_id: SnowflakeData | null;
    self_mute: boolean;
    self_deaf: boolean;
}

async function connectChannel(ws: WebSocket.WebSocket, packet: VoiceState) {
    await send(ws, {
        op: Opcode.VoiceStateUpdate,
        d: packet
    });
}

interface ClientPresence {
    since: number | null;
    activities: ActivityData[];
    status: string;
    afk: boolean;
}

async function updatePresence(ws: WebSocket.WebSocket, packet: ClientPresence) {
    await send(ws, {
        op: Opcode.PresenceUpdate,
        d: packet
    });
}

interface RequestMember {
    guild_id: SnowflakeData;
    query?: string;
    limit: number;
    presences?: boolean;
    user_ids: SnowflakeData[] | SnowflakeData;
    nonces?: string;
}

async function requestGuildMember(ws: WebSocket.WebSocket, packet: RequestMember) {
    await send(ws, {
        op: Opcode.RequestGuildMember,
        d: packet
    });
}