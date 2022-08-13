"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscordData = void 0;
function isDiscordData(obj) {
    let keys = ["op", "d", "s", "t"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isDiscordData = isDiscordData;
