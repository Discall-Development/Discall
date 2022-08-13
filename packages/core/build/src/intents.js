"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customIntents = exports.noneIntents = exports.defaultIntents = exports.allIntents = void 0;
const types_1 = require("@discall/types");
function allIntents() {
    return (types_1.Intents.GUILDS |
        types_1.Intents.GUILD_MEMBERS |
        types_1.Intents.GUILD_BANS |
        types_1.Intents.GUILD_EMOJIS_AND_STICKERS |
        types_1.Intents.GUILD_INTEGRATIONS |
        types_1.Intents.GUILD_WEBHOOKS |
        types_1.Intents.GUILD_INVITES |
        types_1.Intents.GUILD_VOICE_STATES |
        types_1.Intents.GUILD_PRESENCES |
        types_1.Intents.GUILD_MESSAGES |
        types_1.Intents.GUILD_MESSAGE_REACTIONS |
        types_1.Intents.GUILD_MESSAGE_TYPING |
        types_1.Intents.DIRECT_MESSAGES |
        types_1.Intents.DIRECT_MESSAGE_REACTIONS |
        types_1.Intents.DIRECT_MESSAGE_TYPING |
        types_1.Intents.MESSAGE_CONTENT |
        types_1.Intents.GUILD_SCHEDULED_EVENTS);
}
exports.allIntents = allIntents;
function defaultIntents() {
    return (types_1.Intents.GUILDS |
        types_1.Intents.GUILD_BANS |
        types_1.Intents.GUILD_EMOJIS_AND_STICKERS |
        types_1.Intents.GUILD_INTEGRATIONS |
        types_1.Intents.GUILD_WEBHOOKS |
        types_1.Intents.GUILD_INVITES |
        types_1.Intents.GUILD_VOICE_STATES |
        types_1.Intents.GUILD_MESSAGES |
        types_1.Intents.GUILD_MESSAGE_REACTIONS |
        types_1.Intents.GUILD_MESSAGE_TYPING |
        types_1.Intents.DIRECT_MESSAGES |
        types_1.Intents.DIRECT_MESSAGE_REACTIONS |
        types_1.Intents.DIRECT_MESSAGE_TYPING |
        types_1.Intents.GUILD_SCHEDULED_EVENTS);
}
exports.defaultIntents = defaultIntents;
function noneIntents() {
    return 0;
}
exports.noneIntents = noneIntents;
function customIntents(options) {
    let value = 0;
    for (const option of options)
        value |= option;
    return value;
}
exports.customIntents = customIntents;
