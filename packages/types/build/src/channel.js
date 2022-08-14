"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookType = exports.OverwriteType = exports.SystemChannelFlags = exports.ChannelFlags = exports.ChannelTypes = void 0;
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_NEWS"] = 5] = "GUILD_NEWS";
    ChannelTypes[ChannelTypes["GUILD_NEWS_THREAD"] = 10] = "GUILD_NEWS_THREAD";
    ChannelTypes[ChannelTypes["GUILD_PUBLIC_THREAD"] = 11] = "GUILD_PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["GUILD_PRIVATE_THREAD"] = 12] = "GUILD_PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
var ChannelFlags;
(function (ChannelFlags) {
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
})(ChannelFlags = exports.ChannelFlags || (exports.ChannelFlags = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
})(SystemChannelFlags = exports.SystemChannelFlags || (exports.SystemChannelFlags = {}));
var OverwriteType;
(function (OverwriteType) {
    OverwriteType[OverwriteType["Role"] = 0] = "Role";
    OverwriteType[OverwriteType["Member"] = 1] = "Member";
})(OverwriteType = exports.OverwriteType || (exports.OverwriteType = {}));
var WebhookType;
(function (WebhookType) {
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    WebhookType[WebhookType["Channel_Follower"] = 2] = "Channel_Follower";
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType = exports.WebhookType || (exports.WebhookType = {}));
