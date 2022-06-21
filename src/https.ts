import {SnowflakeData} from "./dataType";

export function getBase(version: number) {
    return new URL(`https://discord.com/api/v${version}`);
}

export function createClient(token: string, version: 9 | 10 = 10) {
    let baseUri = getBase(version);
    return async function(type: string, ids: SnowflakeData[], data: any) {
        await sendRequest(Object.create(baseUri), type, ids, data);
    }
}

async function sendRequest(Uri: URL, type: string, ids: SnowflakeData[], data: any) {
    switch (type) {
        case 'application_command_global':
            return;
    }
}

function partial(func: (...params: any) => any, ...params: any) {
    return function(..._params: any) {
        func(...params, ..._params);
    }
}