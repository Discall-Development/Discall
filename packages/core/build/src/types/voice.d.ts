import { GuildMemberData } from "./guild";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
export interface StageInstanceData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    channel_id: SnowflakeData;
    topic: string;
    privacy_level: PrivacyLevel;
    discoverable_disabled: boolean;
    guild_scheduled_event_id: SnowflakeData | null;
}
export interface VoiceStateData {
    guild_id?: SnowflakeData;
    channel_id: SnowflakeData | null;
    user_id: SnowflakeData;
    member?: GuildMemberData;
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
    request_to_speak_timestamp: Timestamp | null;
}
export declare enum VideoQualityModes {
    AUTO = 1,
    FULL = 2
}
export interface VoiceRegionData {
    id: string;
    name: string;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}
export declare enum PrivacyLevel {
    PUBLIC = 1,
    GUILD_ONLY = 2
}
