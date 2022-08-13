"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscordData = void 0;
function isDiscordData(obj) {
    return typeof obj.op === "number";
}
exports.isDiscordData = isDiscordData;
