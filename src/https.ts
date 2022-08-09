import { HttpRequest, HttpMode, AttachmentData, HttpRequestData, HttpUri, IdData, UriMode } from "./types";
import _ws from "./ws"
import { fetch } from "./runtimeModule";
import { ErrorStatus, InvalidHttpRequest } from "./error";
import fs from "node:fs/promises";
import { format } from "./utils";

let baseUri = "https://discord.com/api/v10";
let token: string;
export default function client(_token: string) {
    token = _token;
    return async function(packet: HttpRequest) {
        if (typeof packet.uri !== "function")
            throw new InvalidHttpRequest();

        return await send(packet);
    }
}

function getKey(key: string, data: HttpRequestData): string {
    while(data) {
        key += `+${data.type}`;
        if (Object.keys(data).find(v => v.includes("id"))) {
            data = (data.data as IdData).data;
            continue;
        }

        if (!((data.data as HttpRequestData).type && (data.data as HttpRequestData).data))
            return key;

        data = data.data as HttpRequestData;
    }

    return key;
}

function formatUrl(url: string, data: HttpRequestData): string {
    while(data) {
        if (Object.keys(data).find(v => v.includes("id")))
            url = format(url, data as unknown as Record<string, string>);
        
        if (data.data)
            data = data.data as HttpRequestData;
        else
            return url;
    }

    return url;
}

function getData(data: HttpRequestData): any {
    while(data) {
        if (data.data)
            data = data.data as HttpRequestData;
        else
            return data;
    }
}

function createPacket<T extends (...args: any[]) => any>(key: string, data: HttpRequestData, param?: string | T, reason?: string): HttpRequest {
    let url: string = formatUrl(HttpUri[key as keyof typeof HttpUri], data);
    let result: HttpRequest = {
        uri(base: URL) {
            base.pathname += url;
            return {
                uri: base.toString(),
                mode: UriMode[key as keyof typeof UriMode] as unknown as HttpMode
            };
        },
        data: getData(data)
    };
    if (typeof param === "string")
        result["reason"] = param;
    
    if (typeof param === "function")
        result["cache"] = param;

    if (reason)
        result["reason"] = reason;

    return result;
}

export function create<T extends (...args: any[]) => any>(action: HttpRequestData, cache?: T, reason?: string): HttpRequest;
export function create(action: HttpRequestData, reason?: string): HttpRequest;
export function create<T extends (...args: any[]) => any>(action: HttpRequestData, param?: string | T, reason?: string): HttpRequest {
    return createPacket(getKey("create", action), action, param, reason);
}

export function get<T extends (...args: any[]) => any>(action: HttpRequestData, cache?: T, reason?: string): HttpRequest;
export function get(action: HttpRequestData, reason?: string): HttpRequest;
export function get<T extends (...args: any[]) => any>(action: HttpRequestData, param?: string | T, reason?: string): HttpRequest {
    return createPacket(getKey("get", action), action, param, reason);
}

export function edit<T extends (...args: any[]) => any>(action: HttpRequestData, cache?: T, reason?: string): HttpRequest;
export function edit(action: HttpRequestData, reason?: string): HttpRequest;
export function edit<T extends (...args: any[]) => any>(action: HttpRequestData, param?: string | T, reason?: string): HttpRequest {
    return createPacket(getKey("edit", action), action, param, reason);
}

export function remove<T extends (...args: any[]) => any>(action: HttpRequestData, cache?: T, reason?: string): HttpRequest;
export function remove(action: HttpRequestData, reason?: string): HttpRequest;
export function remove<T extends (...args: any[]) => any>(action: HttpRequestData, param?: string | T, reason?: string): HttpRequest {
    return createPacket(getKey("remove", action), action, param, reason);
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
    let { uri, mode } = getBase(packet.uri);
    if (uri) {
        let headers = new fetch.Headers({
            "Authorization": `Bot ${token}`,
            "User-Agent": "DiscordBot (https://github.com/rexwu1104/Discall, 0.1.0)",
            "Content-Type": "application/json"
        });
        if (packet.reason)
            headers.append("X-Audit-Log-Reason", packet.reason);

        let result: fetch.Response["prototype"];
        if (!packet.data?.attachments) {
            result = await fetch.fetch(uri, {
                method: HttpMode[mode],
                body: packet.data ? JSON.stringify(packet.data) : undefined,
                headers
            });
        } else {
            headers.delete("Content-Type");
            result = await fetch.fetch(uri, {
                method: HttpMode[mode],
                body: await toFormData(packet.data),
                headers
            });
        }

        if (result.status < 200 || result.status >= 300) {
            // console.log(await result.json());
            throw new ErrorStatus(result.status);
        }

        let json = await result.json();
        if (packet.cache)
            packet.cache(json);

        return json;
    } else {
        return (packet.cache as () => any)?.();
    }
}

async function toFormData(data: any): Promise<fetch.FormData> {
    let body = new fetch.FormData();
    let filenames = data.attachments as AttachmentData[];

    body.append("payload_json", JSON.stringify(data));
    for (const idx in filenames) {
        let filename = filenames[idx].filename;
        let data = await fs.readFile(filename);

        body.append(`files[${idx}]`, new fetch.Blob([data]), filename);
    }

    return body;
}

function getBase(uri: HttpRequest["uri"]) {
    return uri(new URL(baseUri));
}