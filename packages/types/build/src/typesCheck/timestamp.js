"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimestamp = void 0;
function isTimestamp(obj) {
    return typeof obj === 'string' && new Date(0) < new Date(obj);
}
exports.isTimestamp = isTimestamp;
