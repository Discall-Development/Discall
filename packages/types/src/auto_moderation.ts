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

export enum RuleEventTypes {
    MESSAGE_SEND = 1
}

export enum RuleTriggerTypes {
    KEYWORD = 1,
    HARMFUL_LINK,
    SPAM,
    KEYWORD_PRESET,
    MENTION_SPAM
}

export interface RuleTriggerMetadata {
    keyword_filter?: string[];
    presets?: KeywordPresetTypes[];
    allow_list?: string[];
    mention_total_limit?: number;
}

export enum KeywordPresetTypes {
    PROFANITY = 1,
    SEXUAL_CONTENT,
    SLURS
}

export interface AutoModerationActionData {
    type: AutoModerationActionTypes;
    metadata?: AutoModerationActionData;
}

export enum AutoModerationActionTypes {
    BLOCK_MESSAGE = 1,
    SEND_ALERT_MESSAGE,
    TIMEOUT
}

export interface AutoModerationActionMetadata {
    channel_id?: SnowflakeData;
    duration_seconds?: number;
}