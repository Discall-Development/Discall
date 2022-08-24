import { HttpRequest, HttpMode, HttpRequestData, HttpUri, UriMode, MessageData, SnowflakeData, Opcode, ReadyEventData } from '@discall/types';
import { fetch } from './runtimeModule';
import { ErrorStatus, InvalidHttpRequest } from './error';
import _ws from './ws';
import fs from 'node:fs/promises';
import { format } from './utils';

const baseUri = 'https://discord.com/api/v10';
let token: string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let user_id: SnowflakeData;
export default function client(_token: string, ws: ReturnType<typeof _ws>) {
    token = _token;
    const onMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        const data = await onMessage(event);
        switch (data.op) {
        case Opcode.Dispatch:
            if (data.t === 'READY')
                user_id = (data.d as ReadyEventData).user.id;
        }

        return data;
    };
    return async function(packet: HttpRequest) {
        if (typeof packet.uri !== 'function')
            throw new InvalidHttpRequest();

        return await send(packet);
    };
}

function getKey(key: string, data: HttpRequestData): string {
    while(data) {
        if (data.type)
            key += `+${data.type}`;

        if (Object.keys(data).find(v => v.includes('id'))) {
            data = data.data as HttpRequestData;
            continue;
        }

        if (!data.data)
            return key;

        data = data.data as HttpRequestData;
    }

    return key;
}

function formatUrl(url: string, data: HttpRequestData): string {
    while(data) {
        if (data['type'] === undefined)
            url = format(url, data as unknown as Record<string, string>);
        
        if (data.data)
            data = data.data as HttpRequestData;
        else
            return url;
    }

    return url;
}

function getData(data: HttpRequestData): unknown {
    while(data) {
        if (data.data)
            data = data.data as HttpRequestData;
        else
            return data;
    }
}

function createPacket(key: string, data: HttpRequestData, reason?: string): HttpRequest {
    console.log(key);
    const url: string = formatUrl(HttpUri[key as keyof typeof HttpUri], data);
    // console.log(url);
    const result: HttpRequest = {
        uri(base: URL) {
            const [pathname, query] = url.split('?');
            if (query)
                query.split('&').forEach((v) => base.searchParams.append(...(v.split('=') as [string, string])));

            base.pathname += pathname;
            return {
                uri: base.toString(),
                mode: UriMode[key as keyof typeof UriMode] as unknown as HttpMode
            };
        }
    };
    
    if (UriMode[key as keyof typeof UriMode] >= HttpMode.POST)
        result['data'] = getData(data);

    if (reason)
        result['reason'] = reason;

    return result;
}

export function create(action: HttpRequestData, reason?: string): HttpRequest {
    return createPacket(getKey('create', action), action, reason);
}

export function get(action: HttpRequestData, reason?: string): HttpRequest {
    return createPacket(getKey('get', action), action, reason);
}

export function edit(action: HttpRequestData, reason?: string): HttpRequest {
    return createPacket(getKey('edit', action), action, reason);
}

export function remove(action: HttpRequestData, reason?: string): HttpRequest {
    return createPacket(getKey('remove', action), action, reason);
}

export const crosspost = create;
export const bulkDelete = create;
export const follow = create;
export const trigger = create;
export const start = create;
export const begin = create;
export const execute = create;
export const list = get;
export const search = get;
export const modify = edit;
export const pin = edit;
export const add = edit;
export const join = edit;
export const sync = edit;
export const close = remove;
export const unpin = remove;
export const leave = remove;

export async function send(packet: HttpRequest) {
    const { uri, mode } = getBase(packet.uri);
    if (uri) {
        const headers = new fetch.Headers({
            'Authorization': `Bot ${token}`,
            'User-Agent': 'DiscordBot (https://github.com/rexwu1104/Discall, 0.1.0)',
            'Content-Type': 'application/json'
        });
        if (packet.reason)
            headers.append('X-Audit-Log-Reason', packet.reason);

        let result: fetch.Response['prototype'];
        if (!(packet.data as MessageData)?.attachments) {
            result = await fetch.fetch(uri, {
                method: HttpMode[mode],
                body: packet.data ? JSON.stringify(packet.data) : undefined,
                headers
            });
        } else {
            headers.delete('Content-Type');
            result = await fetch.fetch(uri, {
                method: HttpMode[mode],
                body: await toFormData(packet.data),
                headers
            });
        }

        if (result.status < 200 || result.status >= 300)
            throw new ErrorStatus(result.status);

        if (result.status === 204)
            return {};

        const json = await result.json();
        if (packet.cache)
            packet.cache(json);

        return json;
    } else {
        return (packet.cache as () => unknown)?.();
    }
}

async function toFormData(data: unknown): Promise<fetch.FormData> {
    const body = new fetch.FormData();
    const filenames = (data as MessageData).attachments;

    body.append('payload_json', JSON.stringify(data));
    for (const idx in filenames) {
        const filename = filenames[idx].filename;
        const data = await fs.readFile(filename);

        body.append(`files[${idx}]`, new fetch.Blob([data]), filename);
    }

    return body;
}

function getBase(uri: HttpRequest['uri']) {
    return uri(new URL(baseUri));
}