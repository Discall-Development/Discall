"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.leave = exports.unpin = exports.close = exports.sync = exports.join = exports.add = exports.pin = exports.modify = exports.search = exports.list = exports.execute = exports.begin = exports.start = exports.trigger = exports.follow = exports.bulkDelete = exports.crosspost = exports.remove = exports.edit = exports.get = exports.create = void 0;
const types_1 = require("@discall/types");
const runtimeModule_1 = require("./runtimeModule");
const error_1 = require("./error");
const promises_1 = __importDefault(require("node:fs/promises"));
const utils_1 = require("./utils");
const baseUri = 'https://discord.com/api/v10';
let token;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let user_id;
function client(_token, ws) {
    token = _token;
    const onMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        const data = await onMessage(event);
        switch (data.op) {
            case types_1.Opcode.Dispatch:
                if (data.t === 'READY')
                    user_id = data.d.user.id;
        }
        return data;
    };
    return async function (packet) {
        if (typeof packet.uri !== 'function')
            throw new error_1.InvalidHttpRequest();
        return await send(packet);
    };
}
exports.default = client;
function getKey(key, data) {
    while (data) {
        if (data.type)
            key += `+${data.type}`;
        if (Object.keys(data).find(v => v.includes('id'))) {
            data = data.data;
            continue;
        }
        if (!data.data)
            return key;
        data = data.data;
    }
    return key;
}
function formatUrl(url, data) {
    while (data) {
        if (data['type'] === undefined)
            url = (0, utils_1.format)(url, data);
        if (data.data)
            data = data.data;
        else
            return url;
    }
    return url;
}
function getData(data) {
    while (data) {
        if (data.data)
            data = data.data;
        else
            return data;
    }
}
function createPacket(key, data, param, reason) {
    console.log(key);
    const url = formatUrl(types_1.HttpUri[key], data);
    const result = {
        uri(base) {
            base.pathname += url;
            return {
                uri: base.toString(),
                mode: types_1.UriMode[key]
            };
        }
    };
    if (types_1.UriMode[key] >= types_1.HttpMode.POST)
        result['data'] = getData(data);
    if (typeof param === 'string')
        result['reason'] = param;
    if (typeof param === 'function')
        result['cache'] = param;
    if (reason)
        result['reason'] = reason;
    return result;
}
function create(action, param, reason) {
    return createPacket(getKey('create', action), action, param, reason);
}
exports.create = create;
function get(action, param, reason) {
    return createPacket(getKey('get', action), action, param, reason);
}
exports.get = get;
function edit(action, param, reason) {
    return createPacket(getKey('edit', action), action, param, reason);
}
exports.edit = edit;
function remove(action, param, reason) {
    return createPacket(getKey('remove', action), action, param, reason);
}
exports.remove = remove;
exports.crosspost = create;
exports.bulkDelete = create;
exports.follow = create;
exports.trigger = create;
exports.start = create;
exports.begin = create;
exports.execute = create;
exports.list = get;
exports.search = get;
exports.modify = edit;
exports.pin = edit;
exports.add = edit;
exports.join = edit;
exports.sync = edit;
exports.close = remove;
exports.unpin = remove;
exports.leave = remove;
async function send(packet) {
    const { uri, mode } = getBase(packet.uri);
    if (uri) {
        const headers = new runtimeModule_1.fetch.Headers({
            'Authorization': `Bot ${token}`,
            'User-Agent': 'DiscordBot (https://github.com/rexwu1104/Discall, 0.1.0)',
            'Content-Type': 'application/json'
        });
        if (packet.reason)
            headers.append('X-Audit-Log-Reason', packet.reason);
        let result;
        if (!packet.data?.attachments) {
            result = await runtimeModule_1.fetch.fetch(uri, {
                method: types_1.HttpMode[mode],
                body: packet.data ? JSON.stringify(packet.data) : undefined,
                headers
            });
        }
        else {
            headers.delete('Content-Type');
            result = await runtimeModule_1.fetch.fetch(uri, {
                method: types_1.HttpMode[mode],
                body: await toFormData(packet.data),
                headers
            });
        }
        if (result.status < 200 || result.status >= 300)
            throw new error_1.ErrorStatus(result.status);
        const json = await result.json();
        if (packet.cache)
            packet.cache(json);
        return json;
    }
    else {
        return packet.cache?.();
    }
}
exports.send = send;
async function toFormData(data) {
    const body = new runtimeModule_1.fetch.FormData();
    const filenames = data.attachments;
    body.append('payload_json', JSON.stringify(data));
    for (const idx in filenames) {
        const filename = filenames[idx].filename;
        const data = await promises_1.default.readFile(filename);
        body.append(`files[${idx}]`, new runtimeModule_1.fetch.Blob([data]), filename);
    }
    return body;
}
function getBase(uri) {
    return uri(new URL(baseUri));
}
