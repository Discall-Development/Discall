"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVoiceRegion = exports.isVoiceState = exports.isStageInstance = void 0;
const guild_1 = require("./guild");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
const timestamp_1 = require("./timestamp");
function isStageInstance(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        guild_id: snowflake_1.isSnowflake,
        channel_id: snowflake_1.isSnowflake,
        topic: original_1.isString,
        privacy_level: original_1.isNumber,
        discoverable_disabled: original_1.isBoolean,
        guild_scheduled_event_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake)
    })(obj);
}
exports.isStageInstance = isStageInstance;
function isVoiceState(obj) {
    return (0, original_1.isTypeObject)({
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        user_id: snowflake_1.isSnowflake,
        member: (0, original_1.isTypeUndefined)(guild_1.isGuildMember),
        session_id: original_1.isString,
        deaf: original_1.isBoolean,
        mute: original_1.isBoolean,
        self_deaf: original_1.isBoolean,
        self_mute: original_1.isBoolean,
        self_stream: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        self_video: original_1.isBoolean,
        suppress: original_1.isBoolean,
        request_to_speak_timestamp: (0, original_1.isTypeNull)(timestamp_1.isTimestamp),
    })(obj);
}
exports.isVoiceState = isVoiceState;
function isVoiceRegion(obj) {
    return (0, original_1.isTypeObject)({
        id: original_1.isString,
        name: original_1.isString,
        optimal: original_1.isBoolean,
        deprecated: original_1.isBoolean,
        custom: original_1.isBoolean
    })(obj);
}
exports.isVoiceRegion = isVoiceRegion;
