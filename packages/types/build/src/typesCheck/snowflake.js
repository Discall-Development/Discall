"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSnowflake = void 0;
function isSnowflake(obj) {
    return typeof obj === "string" && !Number.isNaN(Number(obj));
}
exports.isSnowflake = isSnowflake;
