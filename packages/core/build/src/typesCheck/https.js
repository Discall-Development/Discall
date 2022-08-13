"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdData = exports.isHttpRequestData = exports.isHttpRequest = void 0;
function isHttpRequest(obj) {
    return Object.keys(obj).filter(v => !["uri", "data", "cache", "reason"].includes(v)).length === 0 && "uri" in obj && typeof obj.uri === "function";
}
exports.isHttpRequest = isHttpRequest;
function isHttpRequestData(obj) {
    return "type" in obj && "data" in obj;
}
exports.isHttpRequestData = isHttpRequestData;
function isIdData(obj) {
    return isHttpRequestData(obj.data) && Object.keys(obj).filter(v => v.endsWith("id")).length === 1;
}
exports.isIdData = isIdData;
