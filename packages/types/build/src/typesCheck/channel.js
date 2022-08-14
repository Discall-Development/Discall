"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebhook = exports.isLocaleOption = exports.isOverwrite = exports.isThreadMember = exports.isThreadMetadata = exports.isChannelMention = exports.isWelcomeScreenChannel = exports.isChannel = void 0;
const guild_1 = require("./guild");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
const timestamp_1 = require("./timestamp");
const user_1 = require("./user");
function isChannel(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        position: (0, original_1.isTypeUndefined)(original_1.isNumber),
        permission_overwrites: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isOverwrite)),
        name: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        topic: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        nsfw: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        last_message_id: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(snowflake_1.isSnowflake)),
        bitrate: (0, original_1.isTypeUndefined)(original_1.isNumber),
        user_limit: (0, original_1.isTypeUndefined)(original_1.isNumber),
        rate_limit_per_user: (0, original_1.isTypeUndefined)(original_1.isNumber),
        recipients: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(user_1.isUser)),
        icon: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        owner_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        application_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        parent_id: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(snowflake_1.isSnowflake)),
        last_pin_timestamp: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(timestamp_1.isTimestamp)),
        rtc_region: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        video_quality_mode: (0, original_1.isTypeUndefined)(original_1.isNumber),
        message_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        member_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        thread_metadata: (0, original_1.isTypeUndefined)(isThreadMetadata),
        member: (0, original_1.isTypeUndefined)(isThreadMember),
        default_auto_archive_duration: (0, original_1.isTypeUndefined)(original_1.isNumber),
        permissions: (0, original_1.isTypeUndefined)(original_1.isString),
        flags: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isChannel = isChannel;
function isWelcomeScreenChannel(obj) {
    return (0, original_1.isTypeObject)({
        channel_id: snowflake_1.isSnowflake,
        description: original_1.isString,
        emoji_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        emoji_name: (0, original_1.isTypeNull)(original_1.isString)
    })(obj);
}
exports.isWelcomeScreenChannel = isWelcomeScreenChannel;
function isChannelMention(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        guild_id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        name: original_1.isString
    })(obj);
}
exports.isChannelMention = isChannelMention;
function isThreadMetadata(obj) {
    return (0, original_1.isTypeObject)({
        archived: original_1.isBoolean,
        auto_archive_duration: original_1.isNumber,
        archive_timestamp: timestamp_1.isTimestamp,
        locked: original_1.isBoolean,
        invitable: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        create_timestamp: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(timestamp_1.isTimestamp))
    })(obj);
}
exports.isThreadMetadata = isThreadMetadata;
function isThreadMember(obj) {
    return (0, original_1.isTypeObject)({
        id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        user_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        join_timestamp: timestamp_1.isTimestamp,
        flags: original_1.isNumber
    })(obj);
}
exports.isThreadMember = isThreadMember;
function isOverwrite(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        allow: original_1.isString,
        deny: original_1.isString
    })(obj);
}
exports.isOverwrite = isOverwrite;
function isLocaleOption(obj) {
    return (0, original_1.isUnion)((0, original_1.isLiteral)('da'), (0, original_1.isLiteral)('de'), (0, original_1.isLiteral)('en-GB'), (0, original_1.isLiteral)('en-US'), (0, original_1.isLiteral)('es-ES'), (0, original_1.isLiteral)('fr'), (0, original_1.isLiteral)('hr'), (0, original_1.isLiteral)('it'), (0, original_1.isLiteral)('lt'), (0, original_1.isLiteral)('hu'), (0, original_1.isLiteral)('nl'), (0, original_1.isLiteral)('no'), (0, original_1.isLiteral)('pl'), (0, original_1.isLiteral)('pt-BR'), (0, original_1.isLiteral)('ro'), (0, original_1.isLiteral)('fi'), (0, original_1.isLiteral)('sv-SE'), (0, original_1.isLiteral)('vi'), (0, original_1.isLiteral)('tr'), (0, original_1.isLiteral)('cs'), (0, original_1.isLiteral)('el'), (0, original_1.isLiteral)('bg'), (0, original_1.isLiteral)('ru'), (0, original_1.isLiteral)('uk'), (0, original_1.isLiteral)('hi'), (0, original_1.isLiteral)('th'), (0, original_1.isLiteral)('zh-CN'), (0, original_1.isLiteral)('ja'), (0, original_1.isLiteral)('zh-TW'), (0, original_1.isLiteral)('ko'))(obj);
}
exports.isLocaleOption = isLocaleOption;
function isWebhook(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        channel_id: snowflake_1.isSnowflake,
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        name: (0, original_1.isTypeNull)(original_1.isString),
        avatar: (0, original_1.isTypeNull)(original_1.isString),
        token: (0, original_1.isTypeUndefined)(original_1.isString),
        application_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        source_guild: (0, original_1.isTypeUndefined)(guild_1.isGuild),
        source_channel: (0, original_1.isTypeUndefined)(isChannel),
        url: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isWebhook = isWebhook;
