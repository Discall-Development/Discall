"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebhook = exports.isOverwrite = exports.isThreadMember = exports.isThreadMetadata = exports.isChannelMention = exports.isWelcomeScreenChannel = exports.isChannel = void 0;
function isChannel(obj) {
    let keys = ["id", "type", "guild_id", "position", "permission_overwrites", "name", "topic", "nsfw", "last_message_id", "bitrate", "user_limit", "rate_limit_per_user", "recipients", "icon", "owner_id", "application_id", "parent_id", "last_pin_timestamp", "rtc_region", "video_quality_mode", "message_count", "member_count", "thread_metadata", "member", "default_auto_archive_duration", "permissions", "flags"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isChannel = isChannel;
function isWelcomeScreenChannel(obj) {
    let keys = ["channel_id", "description", "emoji_id", "emoji_name"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isWelcomeScreenChannel = isWelcomeScreenChannel;
function isChannelMention(obj) {
    let keys = ["id", "guild_id", "type", "name"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isChannelMention = isChannelMention;
function isThreadMetadata(obj) {
    let keys = ["archived", "auto_archive_duration", "archive_timestamp", "locked", "invitable", "create_timestamp"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isThreadMetadata = isThreadMetadata;
function isThreadMember(obj) {
    let keys = ["id", "user_id", "join_timestamp", "flags"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isThreadMember = isThreadMember;
function isOverwrite(obj) {
    let keys = ["id", "type", "allow", "deny"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isOverwrite = isOverwrite;
function isWebhook(obj) {
    let keys = ["id", "type", "guild_id", "channel_id", "user", "name", "avatar", "token", "application_id", "source_guild", "source_channel", "url"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isWebhook = isWebhook;
