import { ApplicationData } from "./application";
import { ChannelData, SystemChannelFlags, WelcomeScreenChannelData } from "./channel";
import { DefaultMessageNotificationLevel, EmojiData, StickerData } from "./message";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
import { UserData } from "./user";
export interface GuildData {
    id: SnowflakeData;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: SnowflakeData;
    permissions?: string;
    region?: string | null;
    afk_channel_id: SnowflakeData | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: SnowflakeData | null;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: RoleData[];
    emojis: EmojiData[];
    features: GuildFeature[];
    mfa_level: MFALevel;
    application_id: SnowflakeData | null;
    system_channel_id: SnowflakeData | null;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id: SnowflakeData | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: SnowflakeData | null;
    max_video_channel_users?: number;
    approximate_member_count: number;
    approximate_presence_count: number;
    welcome_screen?: WelcomeScreenData;
    nsfw_level: GuildNSFWLevel;
    stickers: StickerData[];
    premium_progress_bar_enabled: boolean;
}
export interface GuildPreviewData {
    id: SnowflakeData;
    name: string;
    icon: string | null;
    splash: string | null;
    discovery_splash: string | null;
    emojis: EmojiData[];
    features: GuildFeature[];
    approximate_member_count: number;
    approximate_presence_count: number;
    description: string | null;
    stickers: StickerData[];
}
export interface UnavailableGuildData {
    id: SnowflakeData;
    unavailable?: boolean;
}
export declare type GuildFeature = "ANIMATED_BANNER" | "ANIMATED_ICON" | "BANNER" | "COMMERCE" | "COMMUNITY" | "DISCOVERABLE" | "FEATURABLE" | "INVITE_SPLASH" | "MEMBER_VERIFICATION_GATE_ENABLED" | "MONETIZATION_ENABLED" | "MORE_STICKERS" | "NEWS" | "PARTNERED" | "PREVIEW_ENABLED" | "PRIVATE_THREADS" | "ROLE_ICONS" | "TICKETED_EVENTS_ENABLED" | "VANITY_URL" | "VERIFIED" | "VIP_REGIONS" | "WELCOME_SCREEN_ENABLED";
export interface GuildMemberData {
    user?: UserData;
    nick?: string | null;
    avatar?: string | null;
    roles: SnowflakeData[];
    join_at: Timestamp;
    premium_since?: Timestamp | null;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permission?: string;
    communication_disabled_until?: Timestamp | null;
}
export declare enum GuildNSFWLevel {
    DEFAULT = 0,
    EXPLICIT = 1,
    SAFE = 2,
    AGE_RESTRICTED = 3
}
export interface GuildScheduledEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    channel_id: SnowflakeData | null;
    creator_id?: SnowflakeData | null;
    name: string;
    description?: string | null;
    scheduled_start_time: string;
    scheduled_end_time: string | null;
    privacy_level: GuildScheduledEventPrivacyLevel;
    status: GuildScheduledEventStatus;
    entity_type: GuildScheduledEventEntityType;
    entity_id: SnowflakeData | null;
    entity_metadata: GuildScheduledEventEntityMetadata;
    creator?: UserData;
    user_count?: number;
    image?: string | null;
}
export declare enum GuildScheduledEventPrivacyLevel {
    GUILD_ONLY = 2
}
export declare enum GuildScheduledEventStatus {
    SCHEDULED = 1,
    ACTIVE = 2,
    COMPLETED = 3,
    CANCELED = 4
}
export declare enum GuildScheduledEventEntityType {
    STAGE_INSTANCE = 1,
    VOICE = 2,
    EXTERNAL = 3
}
export interface GuildScheduledEventEntityMetadata {
    location?: string;
}
export interface GuildMemberMentionData extends UserData {
    member: GuildMemberData;
}
export interface WelcomeScreenData {
    description: string | null;
    welcome_channels: WelcomeScreenChannelData;
}
export declare enum VerificationLevel {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    VERY_HIGH = 4
}
export declare enum ExplicitContentFilterLevel {
    DISABLED = 0,
    MEMBERS_WITHOUT_ROLES = 1,
    ALL_MEMBERS = 2
}
export declare enum MFALevel {
    NONE = 0,
    ELEVATED = 1
}
export declare enum PremiumTier {
    NONE = 0,
    TIER_1 = 1,
    TIER_2 = 2,
    TIER_3 = 3
}
export interface IntegrationData {
    id: SnowflakeData;
    name: string;
    type: string;
    enabled?: boolean;
    syncing?: boolean;
    role_id?: SnowflakeData;
    enable_emoticons?: boolean;
    expire_behavior?: IntegrationExpireBehaviors;
    expire_grace_period?: number;
    user?: UserData;
    account: IntegrationAccountData;
    synced?: Timestamp;
    subscriber_count?: number;
    revoked?: boolean;
    application?: IntegrationApplicationData;
}
export declare enum IntegrationExpireBehaviors {
    RemoveRole = 0,
    Kick = 1
}
export interface IntegrationAccountData {
    id: string;
    name: string;
}
export interface IntegrationApplicationData {
    id: SnowflakeData;
    name: string;
    icon: string | null;
    description: string;
    bot?: UserData;
}
export interface AllowMentionsData {
    parse: AllowMentionType[];
    roles: SnowflakeData[];
    users: SnowflakeData[];
    replied_user: boolean;
}
export declare enum AllowMentionType {
    Role_Mentions = "roles",
    User_Mentions = "users",
    EveryoneMentions = "everyone"
}
export declare enum PermissionFlags {
    CREATE_INSTANT_INVITE = 1,
    KICK_MEMBERS = 2,
    BAN_MEMBERS = 4,
    ADMINISTRATOR = 8,
    MANAGE_CHANNELS = 16,
    MANAGE_GUILD = 32,
    ADD_REACTIONS = 64,
    VIEW_AUDIT_LOG = 128,
    PRIORITY_SPEAKER = 256,
    STREAM = 512,
    VIEW_CHANNEL = 1024,
    SEND_MESSAGES = 2048,
    SEND_TTS_MESSAGES = 4096,
    MANAGE_MESSAGES = 8192,
    EMBED_LINKS = 16384,
    ATTACH_FILES = 32768,
    READ_MESSAGE_HISTORY = 65536,
    MENTION_EVERYONE = 131072,
    USE_EXTERNAL_EMOJIS = 262144,
    VIEW_GUILD_INSIGHTS = 524288,
    CONNECT = 1048576,
    SPEAK = 2097152,
    MUTE_MEMBERS = 4194304,
    DEAFEN_MEMBERS = 8388608,
    MOVE_MEMBERS = 16777216,
    USE_VAD = 33554432,
    CHANGE_NICKNAME = 67108864,
    MANAGE_NICKNAMES = 134217728,
    MANAGE_ROLES = 268435456,
    MANAGE_WEBHOOKS = 536870912,
    MANAGE_EMOJIS_AND_STICKERS = 1073741824,
    USE_APPLICATION_COMMANDS = -2147483648,
    REQUEST_TO_SPEAK = 4294967296,
    MANAGE_EVENTS = 8589934592,
    MANAGE_THREADS = 17179869184,
    CREATE_PUBLIC_THREADS = 34359738368,
    CREATE_PRIVATE_THREADS = 68719476736,
    USE_EXTERNAL_STICKERS = 137438953472,
    SEND_MESSAGES_IN_THREADS = 274877906944,
    USE_EMBEDDED_ACTIVITIES = 549755813888,
    MODERATE_MEMBERS = 1099511627776
}
export interface InviteData {
    code: string;
    guild?: Partial<GuildData>;
    channel: Partial<ChannelData> | null;
    inviter?: UserData;
    target_type?: InviteTargetType;
    target_user?: UserData;
    target_application?: Partial<ApplicationData>;
    approximate_presence_count?: number;
    approximate_member_count?: number;
    expires_at?: Timestamp | null;
    guild_scheduled_event?: GuildScheduledEventData;
}
export interface InviteMetadata {
    uses: number;
    max_uses: number;
    max_age: number;
    temporary: boolean;
    created_at: Timestamp;
}
export declare enum InviteTargetType {
    STREAM = 1,
    EMBEDDED_APPLICATION = 2
}
export interface RoleData {
    id: SnowflakeData;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTagsData;
}
export interface RoleTagsData {
    bot_id?: SnowflakeData;
    integration_id?: SnowflakeData;
    premium_subscriber?: null;
}
