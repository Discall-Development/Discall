"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeno = exports.isBun = exports.isNode = void 0;
function isNode() {
    if (globalThis.process && globalThis.process.versions.v8)
        return true;
    return false;
}
exports.isNode = isNode;
function isBun() {
    if (globalThis.process && globalThis.process.versions.bun)
        return true;
    return false;
}
exports.isBun = isBun;
function isDeno() {
    if (!globalThis.process)
        return true;
    return false;
}
exports.isDeno = isDeno;
