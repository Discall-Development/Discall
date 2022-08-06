import { HttpRequest, HttpMode, AttachmentData } from "./types";
import _ws from "./ws"
import { fetch } from "./runtimeModule";
import { ErrorStatus, InvalidHttpRequest } from "./error";
import fs from "node:fs/promises";

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

// export function get(action: any): HttpRequest {

// }

// export function create(action: any): HttpRequest {
    
// }

// export function edit(action: any): HttpRequest {
    
// }

// export function remove(action: any): HttpRequest {
    
// }

// export const list = get;
// export const search = get;
// export const crosspost = create;
// export const bulkDelete = create;
// export const follow = create;
// export const trigger = create;
// export const start = create;
// export const begin = create;
// export const execute = create;
// export const modify = edit;
// export const pin = edit;
// export const add = edit;
// export const join = edit;
// export const sync = edit;
// export const close = remove;
// export const unpin = remove;
// export const leave = remove;

export async function send(packet: HttpRequest) {
    let { uri, mode } = getBase(packet.uri);
    if (uri) {
        let headers = new fetch.Headers({
            "Authorization": `Bot ${token}`,
            "User-Agent": `DiscordBot (https://github.com/rexwu1104/Discall, 0.1.0)`,
            "Content-Type": "application/json"
        });
        if (packet.reason)
            headers.append("X-Audit-Log-Reason", packet.reason);

        let result: fetch.Response["prototype"];
        if (!packet.data?.attachments) {
            result = await fetch.fetch(uri, {
                method: HttpMode[mode],
                body: packet.data ? JSON.stringify(packet) : undefined,
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

        if (result.status < 200 || result.status >= 300)
            throw new ErrorStatus(result.status);

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