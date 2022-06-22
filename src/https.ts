import {SnowflakeData} from "./dataType";
import fetch from "node-fetch";

export function getBase(version: number) {
    return new URL(`https://discord.com/api/v${version}`);
}

export function createClient(token: string, version: 9 | 10 = 10) {
    let baseUri = getBase(version);
    return async function(type: string, ids: SnowflakeData[], data: any) {
        await sendRequest(Object.create(baseUri), type, ids, token, data);
    };
}

async function sendRequest(Uri: URL, type: string, ids: SnowflakeData[], token: string, data: any) {
    switch (type) {
    case "application_command_global":
        return await setGlobalApplicationCommand(Uri, token, data, ids[0]);
    }
}

function partial(func: (...params: any) => any, ...params: any) {
    return function(..._params: any) {
        func(...params, ..._params);
    };
}

async function setGlobalApplicationCommand(Uri: URL, token: string, data: any, application_id: SnowflakeData) {
    Uri.pathname += `/applications/${application_id}/commands`;
    let headers = {
        "Authorization": `Bot ${token}`
    };

    let json = await fetch(Uri.toString(), {
        body: JSON.stringify(data),
        method: "POST",
        headers
    }).then(res => res.json());

    console.log(json);
}