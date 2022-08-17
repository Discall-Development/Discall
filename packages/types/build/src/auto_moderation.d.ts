import { SnowflakeData } from './snowflake';
export interface AutoModerationRuleData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    name: string;
    creator_id: SnowflakeData;
    event_type: RuleEventTypes;
    trigger_type: RuleTriggerTypes;
    trigger_metadata: RuleTriggerMetadata;
    actions: AutoModerationActionData[];
    enabled: boolean;
    exempt_roles: SnowflakeData[];
    exempt_channels: SnowflakeData[];
}
export declare enum RuleEventTypes {
    MESSAGE_SEND = 1
}
export declare enum RuleTriggerTypes {
    KEYWORD = 1,
    HARMFUL_LINK = 2,
    SPAM = 3,
    KEYWORD_PRESET = 4,
    MENTION_SPAM = 5
}
export interface RuleTriggerMetadata {
    keyword_filter?: string[];
    presets?: KeywordPresetTypes[];
    allow_list?: string[];
    mention_total_limit?: number;
}
export declare enum KeywordPresetTypes {
    PROFANITY = 1,
    SEXUAL_CONTENT = 2,
    SLURS = 3
}
export interface AutoModerationActionData {
    type: AutoModerationActionTypes;
    metadata?: AutoModerationActionData;
}
export declare enum AutoModerationActionTypes {
    BLOCK_MESSAGE = 1,
    SEND_ALERT_MESSAGE = 2,
    TIMEOUT = 3
}
export interface AutoModerationActionMetadata {
    channel_id?: SnowflakeData;
    duration_seconds?: number;
}
