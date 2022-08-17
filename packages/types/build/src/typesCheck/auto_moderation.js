"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutoModerationActionMetadata = exports.isAutoModerationAction = exports.isRuleTriggerMetadata = exports.isAutoModerationRule = void 0;
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
function isAutoModerationRule(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        guild_id: snowflake_1.isSnowflake,
        name: original_1.isString,
        creator_id: snowflake_1.isSnowflake,
        event_type: original_1.isNumber,
        trigger_type: original_1.isNumber,
        trigger_metadata: isRuleTriggerMetadata,
        actions: (0, original_1.isTypeArray)(isAutoModerationAction),
        enabled: original_1.isBoolean,
        exempt_roles: (0, original_1.isTypeArray)(snowflake_1.isSnowflake),
        exempt_channels: (0, original_1.isTypeArray)(snowflake_1.isSnowflake)
    })(obj);
}
exports.isAutoModerationRule = isAutoModerationRule;
function isRuleTriggerMetadata(obj) {
    return (0, original_1.isTypeObject)({
        keyword_filter: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(original_1.isString)),
        presets: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(original_1.isNumber)),
        allow_list: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(original_1.isString)),
        mention_total_limit: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isRuleTriggerMetadata = isRuleTriggerMetadata;
function isAutoModerationAction(obj) {
    return (0, original_1.isTypeObject)({
        type: original_1.isNumber,
        metadata: (0, original_1.isTypeUndefined)(isAutoModerationActionMetadata)
    })(obj);
}
exports.isAutoModerationAction = isAutoModerationAction;
function isAutoModerationActionMetadata(obj) {
    return (0, original_1.isTypeObject)({
        channel_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        duration_seconds: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isAutoModerationActionMetadata = isAutoModerationActionMetadata;
