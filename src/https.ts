import {ApplicationCommandData} from "./dataType";

const fetch = (url: string, option: any) => import("node-fetch").then(({default: fetch}) => fetch(url, option));

let Global: {
    slashCommand: {
        [k: string]: ApplicationCommandData;
    };
    userCommand: {
        [k: string]: ApplicationCommandData;
    };
    messageCommand: {
        [k: string]: ApplicationCommandData;
    };
} = {
    slashCommand: {},
    userCommand: {},
    messageCommand: {}
};

export function createClient(token: string, version: 9 | 10 = 10) {
    let baseUri = getBase(version);

    return async function({ uri, data }: {
        uri: (base: URL) => { uri: string, mode: string },
        data: any
    }) {
        await sendRequest(uri(baseUri), token, data);
    };
}

function getBase(version: number) {
    return new URL(`https://discord.com/api/v${version}`);
}

async function sendRequest({ uri, mode }: { uri: string, mode: string }, token: string, data?: any) {
    let headers = {
        "Authorization": `Bot ${token}`,
        "Content-Type": "application/json"
    };

    if (data)
        return await fetch(uri, {
            method: mode,
            body: JSON.stringify(data),
            headers
        }).then(r => r.json()) as any;

    return await fetch(uri, {
        method: mode,
        headers
    }).then(r => r.json()) as any;
}

function partial(func: (...params: any) => any, ...params: any) {
    return function(..._params: any) {
        func(...params, ..._params);
    };
}