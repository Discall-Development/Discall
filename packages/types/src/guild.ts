import { ApplicationData } from './application';
import { ChannelData, SystemChannelFlags, WelcomeScreenChannelData } from './channel';
import { DefaultMessageNotificationLevel, EmojiData, StickerData } from './message';
import { SnowflakeData } from './snowflake';
import { Timestamp } from './timestamp';
import { UserData } from './user';

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

export type GuildFeature =
    | 'ANIMATED_BANNER'
    | 'ANIMATED_ICON'
    | 'BANNER'
    | 'COMMERCE'
    | 'COMMUNITY'
    | 'DISCOVERABLE'
    | 'FEATURABLE'
    | 'INVITE_SPLASH'
    | 'MEMBER_VERIFICATION_GATE_ENABLED'
    | 'MONETIZATION_ENABLED'
    | 'MORE_STICKERS'
    | 'NEWS'
    | 'PARTNERED'
    | 'PREVIEW_ENABLED'
    | 'PRIVATE_THREADS'
    | 'ROLE_ICONS'
    | 'TICKETED_EVENTS_ENABLED'
    | 'VANITY_URL'
    | 'VERIFIED'
    | 'VIP_REGIONS'
    | 'WELCOME_SCREEN_ENABLED';

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

export enum GuildNSFWLevel {
    DEFAULT, EXPLICIT, SAFE, AGE_RESTRICTED,
}

export interface GuildScheduledEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    channel_id: SnowflakeData | null;
    creator_id?: SnowflakeData | null;
    name: string;
    description?: string | null;
    scheduled_start_time: Timestamp;
    scheduled_end_time: Timestamp | null;
    privacy_level: GuildScheduledEventPrivacyLevel;
    status: GuildScheduledEventStatus;
    entity_type: GuildScheduledEventEntityType;
    entity_id: SnowflakeData | null;
    entity_metadata: GuildScheduledEventEntityMetadata;
    creator?: UserData;
    user_count?: number;
    image?: string | null;
}

export enum GuildScheduledEventPrivacyLevel {
    GUILD_ONLY = 2,
}

export enum GuildScheduledEventStatus {
    SCHEDULED = 1, ACTIVE, COMPLETED, CANCELED,
}

export enum GuildScheduledEventEntityType {
    STAGE_INSTANCE = 1, VOICE, EXTERNAL,
}

export interface GuildScheduledEventEntityMetadata {
    location?: string;
}

export interface GuildMemberMentionData extends UserData {
    member: GuildMemberData;
}

export interface WelcomeScreenData {
    description: string | null;
    welcome_channels: WelcomeScreenChannelData[];
}

export enum VerificationLevel {
    NONE, LOW, MEDIUM, HIGH, VERY_HIGH,
}

export enum ExplicitContentFilterLevel {
    DISABLED, MEMBERS_WITHOUT_ROLES, ALL_MEMBERS,
}

export enum MFALevel {
    NONE, ELEVATED,
}

export enum PremiumTier {
    NONE, TIER_1, TIER_2, TIER_3,
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
    synced_at?: Timestamp;
    subscriber_count?: number;
    revoked?: boolean;
    application?: IntegrationApplicationData;
}

export enum IntegrationExpireBehaviors {
    RemoveRole, Kick,
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

export enum AllowMentionType {
    Role_Mentions = 'roles',
    User_Mentions = 'users',
    EveryoneMentions = 'everyone'
}

export enum PermissionFlags {
    CREATE_INSTANT_INVITE = 1 << 0,
    KICK_MEMBERS = 1 << 1,
    BAN_MEMBERS = 1 << 2,
    ADMINISTRATOR = 1 << 3,
    MANAGE_CHANNELS = 1 << 4,
    MANAGE_GUILD = 1 << 5,
    ADD_REACTIONS = 1 << 6,
    VIEW_AUDIT_LOG = 1 << 7,
    PRIORITY_SPEAKER = 1 << 8,
    STREAM = 1 << 9,
    VIEW_CHANNEL = 1 << 10,
    SEND_MESSAGES = 1 << 11,
    SEND_TTS_MESSAGES = 1 << 12,
    MANAGE_MESSAGES = 1 << 13,
    EMBED_LINKS = 1 << 14,
    ATTACH_FILES = 1 << 15,
    READ_MESSAGE_HISTORY = 1 << 16,
    MENTION_EVERYONE = 1 << 17,
    USE_EXTERNAL_EMOJIS = 1 << 18,
    VIEW_GUILD_INSIGHTS = 1 << 19,
    CONNECT = 1 << 20,
    SPEAK = 1 << 21,
    MUTE_MEMBERS = 1 << 22,
    DEAFEN_MEMBERS = 1 << 23,
    MOVE_MEMBERS = 1 << 24,
    USE_VAD = 1 << 25,
    CHANGE_NICKNAME = 1 << 26,
    MANAGE_NICKNAMES = 1 << 27,
    MANAGE_ROLES = 1 << 28,
    MANAGE_WEBHOOKS = 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
    USE_APPLICATION_COMMANDS = 1 << 31,
    REQUEST_TO_SPEAK = 0x100000000,
    MANAGE_EVENTS = 0x200000000,
    MANAGE_THREADS = 0x400000000,
    CREATE_PUBLIC_THREADS = 0x800000000,
    CREATE_PRIVATE_THREADS = 0x1000000000,
    USE_EXTERNAL_STICKERS = 0x2000000000,
    SEND_MESSAGES_IN_THREADS = 0x4000000000,
    USE_EMBEDDED_ACTIVITIES = 0x8000000000,
    MODERATE_MEMBERS = 0x10000000000
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

export enum InviteTargetType {
    STREAM = 1, EMBEDDED_APPLICATION,
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