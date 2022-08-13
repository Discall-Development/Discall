"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdData = exports.isHttpRequestData = exports.isHttpRequest = void 0;
function isHttpRequest(obj) {
    let keys = ["uri", "data", "cache", "reason"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isHttpRequest = isHttpRequest;
function isHttpRequestData(obj) {
    let keys = ["type", "data"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isHttpRequestData = isHttpRequestData;
function isIdData(obj) {
    let keys = ["channel_id", "message_id", "data"];
    return isHttpRequestData(obj.data) &&
        Object.keys(obj).filter(v => v.endsWith("id")).length === 1 &&
        Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIdData = isIdData;
