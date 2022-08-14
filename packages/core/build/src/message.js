"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeds = exports.attachments = void 0;
const error_1 = require("./error");
const types_1 = require("@discall/types");
const utils_1 = require("./utils");
function message(arg_1, arg_2, arg_3) {
    if (arg_3 && (0, types_1.isSnowflake)(arg_3))
        return {
            type: 'id',
            data: message(arg_1, arg_2)
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1, param_2) => message(param_1, param_2, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'message',
            data: arg_1
        };
    if ((0, utils_1.isEmpty)(arg_1))
        throw new error_1.EmptyError('message');
    return {
        type: 'message',
        data: { ...arg_1, ...arg_2 }
    };
}
exports.default = message;
function attachments(files) {
    if ((0, utils_1.isEmpty)(files))
        return [];
    const results = [];
    let idx = 0;
    for (const file in files) {
        results.push({
            id: idx.toString(),
            description: files[file],
            filename: file
        });
        idx++;
    }
    return results;
}
exports.attachments = attachments;
function embeds(embeds) {
    const result = [];
    const files = {};
    for (const data of embeds.values()) {
        const obj = {
            title: data.title,
            description: data.description,
            url: data.url,
            timestamp: data.timestamp?.toISOString(),
            color: data.color,
            footer: data.footer,
            author: data.author,
            fields: data.fields
        };
        if (data.image !== undefined && !(0, utils_1.isEmpty)(data.image)) {
            const { url, file } = pathToUrlWithFile(data.image);
            obj.image = { url };
            if (file)
                files[file] = '';
        }
        if (data.thumbnail !== undefined && !(0, utils_1.isEmpty)(data.thumbnail)) {
            const { url, file } = pathToUrlWithFile(data.thumbnail);
            obj.thumbnail = { url };
            if (file)
                files[file] = '';
        }
        if (!(0, utils_1.isEmpty)(obj))
            result.push({ ...obj, type: 'rich' });
    }
    return { embeds: result, attachments: attachments(files) };
}
exports.embeds = embeds;
function pathToUrlWithFile(path) {
    if (path.startsWith('https://'))
        return { url: path, file: null };
    if (path.startsWith('attachment://'))
        return { url: path, file: path.split('attachment://')[1] };
    return { url: 'attachment://' + path.split('/').slice(-1), file: path };
}
