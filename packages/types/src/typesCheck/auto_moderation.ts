import { AutoModerationActionData, AutoModerationActionMetadata, AutoModerationRuleData, RuleTriggerMetadata } from '../auto_moderation';
import { isBoolean, isNumber, isString, isTypeArray, isTypeObject, isTypeUndefined } from './original';
import { isSnowflake } from './snowflake';

export function isAutoModerationRule(obj: unknown): obj is AutoModerationRuleData {
    return isTypeObject({
        id: isSnowflake,
        guild_id: isSnowflake,
        name: isString,
        creator_id: isSnowflake,
        event_type: isNumber,
        trigger_type: isNumber,
        trigger_metadata: isRuleTriggerMetadata,
        actions: isTypeArray(isAutoModerationAction),
        enabled: isBoolean,
        exempt_roles: isTypeArray(isSnowflake),
        exempt_channels: isTypeArray(isSnowflake)
    })(obj);
}

export function isRuleTriggerMetadata(obj: unknown): obj is RuleTriggerMetadata {
    return isTypeObject({
        keyword_filter: isTypeUndefined(isTypeArray(isString)),
        presets: isTypeUndefined(isTypeArray(isNumber)),
        allow_list: isTypeUndefined(isTypeArray(isString)),
        mention_total_limit: isTypeUndefined(isNumber)
    })(obj);
}

export function isAutoModerationAction(obj: unknown): obj is AutoModerationActionData {
    return isTypeObject({
        type: isNumber,
        metadata: isTypeUndefined(isAutoModerationActionMetadata)
    })(obj);
}

export function isAutoModerationActionMetadata(obj: unknown): obj is AutoModerationActionMetadata {
    return isTypeObject({
        channel_id: isTypeUndefined(isSnowflake),
        duration_seconds: isTypeUndefined(isNumber)
    })(obj);
}