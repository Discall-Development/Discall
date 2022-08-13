import { GuildData } from "./guild";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
import { UserData } from "./user";
import { VideoQualityModes } from "./voice";
export interface ChannelData {
    id: SnowflakeData;
    type: ChannelTypes;
    guild_id?: SnowflakeData;
    position?: number;
    permission_overwrites?: OverwriteData[];
    name?: string | null;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: SnowflakeData | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: UserData[];
    icon?: string | null;
    owner_id?: SnowflakeData;
    application_id?: SnowflakeData;
    parent_id?: SnowflakeData | null;
    last_pin_timestamp?: Timestamp | null;
    rtc_region?: string | null;
    video_quality_mode?: VideoQualityModes;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMetadataData;
    member?: ThreadMemberData;
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: ChannelFlags;
}
export declare enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15
}
export declare enum ChannelFlags {
    PINNED = 2
}
export declare enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 2,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 4,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 8
}
export interface WelcomeScreenChannelData {
    channel_id: SnowflakeData;
    description: string;
    emoji_id: SnowflakeData | null;
    emoji_name: string | null;
}
export interface ChannelMentionData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    type: ChannelTypes;
    name: string;
}
export interface ThreadMetadataData {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: Timestamp;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: Timestamp | null;
}
export interface ThreadMemberData {
    id?: SnowflakeData;
    user_id?: SnowflakeData;
    join_timestamp: Timestamp;
    flags: number;
}
export interface OverwriteData {
    id: SnowflakeData;
    type: number;
    allow: string;
    deny: string;
}
export declare type LocaleOption = "da" | "de" | "en-GB" | "en-US" | "es-ES" | "fr" | "hr" | "it" | "lt" | "hu" | "nl" | "no" | "pl" | "pt-BR" | "ro" | "fi" | "sv-SE" | "vi" | "tr" | "cs" | "el" | "bg" | "ru" | "uk" | "hi" | "th" | "zh-CN" | "ja" | "zh-TW" | "ko";
export interface WebhookData {
    id: SnowflakeData;
    type: WebhookType;
    guild_id?: SnowflakeData;
    channel_id: SnowflakeData;
    user?: UserData;
    name: string | null;
    avatar: string | null;
    token?: string;
    application_id: SnowflakeData | null;
    source_guild?: Partial<GuildData>;
    source_channel?: Partial<ChannelData>;
    url?: string;
}
export declare enum WebhookType {
    Incoming = 1,
    Channel_Follower = 2,
    Application = 3
}
