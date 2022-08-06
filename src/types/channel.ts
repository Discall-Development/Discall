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

export enum ChannelTypes {
    GUILD_TEXT,
    DM,
    GUILD_VOICE,
    GROUP_DM,
    GUILD_CATEGORY,
    GUILD_NEWS,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD,
    GUILD_PRIVATE_THREAD,
    GUILD_STAGE_VOICE,
    GUILD_DIRECTORY,
    GUILD_FORUM,
}

export enum ChannelFlags {
    PINNED = 1 << 1,
}

export enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
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

export type LocaleOption =
    | "da"
    | "de"
    | "en-GB"
    | "en-US"
    | "es-ES"
    | "fr"
    | "hr"
    | "it"
    | "lt"
    | "hu"
    | "nl"
    | "no"
    | "pl"
    | "pt-BR"
    | "ro"
    | "fi"
    | "sv-SE"
    | "vi"
    | "tr"
    | "cs"
    | "el"
    | "bg"
    | "ru"
    | "uk"
    | "hi"
    | "th"
    | "zh-CN"
    | "ja"
    | "zh-TW"
    | "ko";

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

export enum WebhookType {
    Incoming = 1,
    Channel_Follower,
    Application
}