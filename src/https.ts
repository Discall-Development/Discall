import {ApplicationCommandData} from "./dataType";
import * as fs from "node:fs/promises";
import * as JSON from "json-bigint";
import {InvalidHttpRequest} from "./errors";

let Global: {
    slashCommand: Record<string, ApplicationCommandData>;
    userCommand: Record<string, ApplicationCommandData>;
    messageCommand: Record<string, ApplicationCommandData>;
} = {
    slashCommand: {},
    userCommand: {},
    messageCommand: {}
};

export function createClient(token: string, version: 9 | 10 = 10) {
    return async function({ uri, data, cache, reason }: {
        uri: (base: URL) => { uri: string, mode: string };
        data?: any;
        cache?: any;
        reason?: string;
    }) {
        if (typeof uri !== "function")
            throw new InvalidHttpRequest();

        return await sendRequest(uri(getBase(version)), token, { data, cache, reason });
    };
}

function getBase(version: number) {
    return new URL(`https://discord.com/api/v${version}`);
}

async function sendRequest({ uri, mode }: { uri: string, mode: string }, token: string, { data, cache, reason }: {
    data?: any;
    cache?: (...param: any) => any;
    reason?: string;
}) {
    if (mode === "NONE")
        return cache?.();

    let headers: {
        "Authorization": string;
        "User-Agent": string;
        "Content-Type"?: string;
        "X-Audit-Log-Reason"?: string;
    } = {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot (https://www.github.com/rexwu1104/Discall, 0.1.0)"
    };

    if (reason)
        headers["X-Audit-Log-Reason"] = reason;

    let result: any;
    if (!data)
        result = await fetch(uri, {
            method: mode,
            headers
        });

    if (!data.attachments)
        result = await fetch(uri, {
            method: mode,
            body: JSON.stringify(data),
            headers
        });

    if (data.attachments) {
        delete headers["Content-Type"];
        result = await fetch(uri, {
            method: mode,
            body: await jsonToFormData(data),
            headers
        });
    }

    if (cache && (result.code >= 200 && result < 300))
        cache(result = await result.json());

    return result;
}

async function jsonToFormData(json: any): Promise<FormData> {
    let body = new FormData();
    let filenames = json.attachments;

    body.append("payload_json", JSON.stringify(json));
    for (const idx in filenames) {
        let filename = filenames[idx].filename;
        let data = await fs.readFile(filename);

        body.append(`files[${idx}]`, new Blob([data]), filename);
    }

    return body;
}
