"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActivityTimestamp = exports.isActivity = void 0;
function isActivity(obj) {
    let keys = ["name", "type", "url", "created_at", "timestamps", "application_id", "details", "state", "emoji", "party", "assets", "secrets", "instance", "flags", "buttons"];
    return !Object.keys(obj).filter(v => !keys.includes(v));
}
exports.isActivity = isActivity;
function isActivityTimestamp(obj) {
    let keys = ["start", "end"];
    return !Object.keys(obj).filter(v => !keys.includes(v));
}
exports.isActivityTimestamp = isActivityTimestamp;
