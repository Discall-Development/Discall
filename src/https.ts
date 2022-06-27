import {ApplicationCommandData} from "./dataType";
import * as fs from "node:fs/promises";
import * as JSON from "json-bigint";

const fetch = (url: string, option: any) => import("node-fetch").then(({default: fetch}) => fetch(url, option));
let FormData: any;
let Blob: any;

void (async () => {
    let _fetch = await import("node-fetch");
    FormData = _fetch.FormData;
    Blob = _fetch.Blob;
})();

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
    return async function({ uri, data }: {
        uri: (base: URL) => { uri: string, mode: string },
        data?: any
    }) {
        return await sendRequest(uri(getBase(version)), token, version, data);
    };
}

function getBase(version: number) {
    return new URL(`https://discord.com/api/v${version}`);
}

async function sendRequest({ uri, mode }: { uri: string, mode: string }, token: string, version: number, data?: any) {
    let headers: {
        "Authorization": string;
        "User-Agent": string;
        "Content-Type"?: string;
    } = {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json",
        "User-Agent": `DiscordBot (${uri}, ${version})`
    };

    if (!data)
        return await fetch(uri, {
            method: mode,
            headers
        }).then(r => r.json()) as any;

    if (!data.attachments)
        return await fetch(uri, {
            method: mode,
            body: JSON.stringify(data),
            headers
        }).then(r => r.json()) as any;

    delete headers["Content-Type"];
    return await fetch(uri, {
        method: mode,
        body: await jsonToFormData(data),
        headers
    }).then(r => r.json());
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

function partial(func: (...params: any) => any, ...params: any) {
    return function(..._params: any) {
        func(...params, ..._params);
    };
}