"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPresenceUpdate = exports.isUser = exports.isClientStatus = exports.isActivityButtons = exports.isActivitySecrets = exports.isActivityAssets = exports.isActivityParty = exports.isActivityEmoji = exports.isActivityTimestamp = exports.isActivity = void 0;
function isActivity(obj) {
    let keys = ["name", "type", "url", "created_at", "timestamps", "application_id", "details", "state", "emoji", "party", "assets", "secrets", "instance", "flags", "buttons"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivity = isActivity;
function isActivityTimestamp(obj) {
    let keys = ["start", "end"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivityTimestamp = isActivityTimestamp;
function isActivityEmoji(obj) {
    let keys = ["name", "id", "animated"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivityEmoji = isActivityEmoji;
function isActivityParty(obj) {
    let keys = ["id", "size"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivityParty = isActivityParty;
function isActivityAssets(obj) {
    let keys = ["large_image", "large_text", "small_image", "small_text"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivityAssets = isActivityAssets;
function isActivitySecrets(obj) {
    let keys = ["join", "spectate", "match"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivitySecrets = isActivitySecrets;
function isActivityButtons(obj) {
    let keys = ["label", "url"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActivityButtons = isActivityButtons;
function isClientStatus(obj) {
    let keys = ["desktop", "mobile", "web"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isClientStatus = isClientStatus;
function isUser(obj) {
    let keys = ["id", "username", "discriminator", "avatar", "bot", "system", "mfa_enabled", "banner", "accent_color", "locale", "verified", "email", "flags", "premium_type", "public_flags"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isUser = isUser;
function isPresenceUpdate(obj) {
    let keys = ["user", "guild_id", "status", "activities", "client_status"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isPresenceUpdate = isPresenceUpdate;
