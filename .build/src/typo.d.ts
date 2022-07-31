declare type Timestamp = string;
export interface DiscordData {
    op: number;
    d?: any;
    s?: number;
    t?: string;
}
export declare enum Intents {
    GUILDS = 1,
    GUILD_MEMBERS = 2,
    GUILD_BANS = 4,
    GUILD_EMOJIS_AND_STICKERS = 8,
    GUILD_INTEGRATIONS = 16,
    GUILD_WEBHOOKS = 32,
    GUILD_INVITES = 64,
    GUILD_VOICE_STATES = 128,
    GUILD_PRESENCES = 256,
    GUILD_MESSAGES = 512,
    GUILD_MESSAGE_REACTIONS = 1024,
    GUILD_MESSAGE_TYPING = 2048,
    DIRECT_MESSAGES = 4096,
    DIRECT_MESSAGE_REACTIONS = 8192,
    DIRECT_MESSAGE_TYPING = 16384,
    MESSAGE_CONTENT = 32768,
    GUILD_SCHEDULED_EVENTS = 65536
}
export declare enum Opcode {
    Dispatch = 0,
    Heartbeat = 1,
    Identity = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 6,
    Reconnect = 7,
    RequestGuildMember = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatACK = 11
}
export declare enum VoiceOpcode {
    Identity = 0,
    SelectProtocol = 1,
    Ready = 2,
    Heartbeat = 3,
    SessionDescription = 4,
    Speaking = 5,
    HeartbeatACK = 6,
    Resume = 7,
    Hello = 8,
    Resumed = 9,
    ClientDisconnect = 13
}
export interface WSOptions {
    version?: 9 | 10;
    commandTimeout?: number;
}
export declare type EventData = ReadyEventData | ResumeEventData | ApplicationCommandPermissionsUpdateEventData | ChannelCreateEventData | ChannelUpdateEventData | ChannelDeleteEventData | ThreadCreateEventData | ThreadUpdateEventData | ThreadDeleteEventData | ThreadListSyncEventData | ThreadMemberUpdateEventData | ThreadMembersUpdateEventData | ChannelPinsUpdateEventData | GuildCreateEventData | GuildUpdateEventData | GuildDeleteEventData | GuildBanAddEventData | GuildBanRemoveEventData | GuildEmojisUpdateEventData | GuildStickersUpdateEventData | GuildIntegrationsUpdateEventData | GuildMemberAddEventData | GuildMemberRemoveEventData | GuildMemberUpdateEventData | GuildMembersChunkEventData | GuildRoleCreateEventData | GuildRoleUpdateEventData | GuildRoleDeleteEventData | GuildScheduledEventCreateEventData | GuildScheduledEventUpdateEventData | GuildScheduledEventDeleteEventData | GuildScheduledEventUserAddEventData | GuildScheduledEventUserRemoveEventData | IntegrationCreateEventData | IntegrationUpdateEventData | IntegrationDeleteEventData | InviteCreateEventData | InviteDeleteEventData | MessageCreateEventData | MessageUpdateEventData | MessageDeleteEventData | MessageDeleteBulkEventData | MessageReactionAddEventData | MessageReactionRemoveEventData | MessageReactionRemoveAllEventData | MessageReactionRemoveEmojiEventData | PresenceUpdateEventData | TypingStartEventData | UserUpdateEventData | VoiceStateUpdateEventData | VoiceServerUpdateEventData | WebhookUpdateEventData | InteractionCreateEventData | StageInstanceCreateEventData | StageInstanceUpdateEventData | StageInstanceDeleteEventData;
export interface ReadyEventData {
    v: number;
    user: UserData;
    guilds: UnavailableGuildData[];
    session_id: string;
    shard?: [number, number];
    application: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
}
export interface ResumeEventData {
}
export interface ApplicationCommandPermissionsUpdateEventData {
    id: SnowflakeData;
    application_id: SnowflakeData;
    guild_id: SnowflakeData;
    permissions: ApplicationCommandPermissionsData[];
}
export interface ChannelCreateEventData extends ChannelData {
}
export interface ChannelUpdateEventData extends ChannelData {
}
export interface ChannelDeleteEventData extends ChannelData {
}
export interface ThreadCreateEventData extends ChannelData {
    newly_created?: boolean;
    thread_member?: ThreadMemberData;
}
export interface ThreadUpdateEventData extends ChannelData {
}
export interface ThreadDeleteEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    parent_id: SnowflakeData | null;
    type: ChannelTypes;
}
export interface ThreadListSyncEventData {
    guild_id: SnowflakeData;
    channel_ids?: SnowflakeData[];
    threads: ChannelData[];
    members: ThreadMemberData[];
}
export interface ThreadMemberUpdateEventData extends ThreadMemberData {
    guild_id: SnowflakeData;
}
export interface ThreadMembersUpdateEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    member_count: number;
    added_members?: ThreadMemberData[];
    removed_member_ids?: SnowflakeData[];
}
export interface ChannelPinsUpdateEventData {
    guild_id?: SnowflakeData;
    channel_id: SnowflakeData;
    last_pin_timestamp?: Timestamp | null;
}
export interface GuildCreateEventData extends GuildData {
    join_at: Timestamp;
    large: boolean;
    unavailable: boolean;
    member_count: number;
    voice_states: VoiceStateData[];
    members: GuildMemberData[];
    channels: ChannelData[];
    threads: ChannelData[];
    presences: {
        user: UserData;
        status: string;
        activities: ActivityData[];
        client_status: ClientStatusData;
    }[];
    stage_instances: StageInstanceData[];
    guild_scheduled_events: GuildScheduledEventData;
}
export interface GuildUpdateEventData extends GuildData {
}
export interface GuildDeleteEventData extends UnavailableGuildData {
}
export interface GuildBanAddEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildBanRemoveEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildEmojisUpdateEventData {
    guild_id: SnowflakeData;
    emojis: EmojiData[];
}
export interface GuildStickersUpdateEventData {
    guild_id: SnowflakeData;
    stickers: StickerData[];
}
export interface GuildIntegrationsUpdateEventData {
    guild_id: SnowflakeData;
}
export interface GuildMemberAddEventData extends GuildMemberData {
    guild_id: SnowflakeData;
}
export interface GuildMemberRemoveEventData {
    guild_id: SnowflakeData;
    user: UserData;
}
export interface GuildMemberUpdateEventData {
    guild_id: SnowflakeData;
    roles: SnowflakeData[];
    user: UserData;
    nick?: string | null;
    avatar: string | null;
    join_at: Timestamp | null;
    premium_since?: Timestamp | null;
    deaf?: boolean;
    mute?: boolean;
    pending?: boolean;
    communication_disabled_until?: Timestamp | null;
}
export interface GuildMembersChunkEventData {
    guild_id: SnowflakeData;
    members: GuildMemberData[];
    chunk_index: number;
    chunk_count: number;
    not_found?: any[];
    presences?: PresenceUpdateData[];
    nonce?: string;
}
export interface GuildRoleCreateEventData {
    guild_id: SnowflakeData;
    role: RoleData;
}
export interface GuildRoleUpdateEventData {
    guild_id: SnowflakeData;
    role: RoleData;
}
export interface GuildRoleDeleteEventData {
    guild_id: SnowflakeData;
    role_id: SnowflakeData;
}
export interface GuildScheduledEventCreateEventData extends GuildScheduledEventData {
}
export interface GuildScheduledEventUpdateEventData extends GuildScheduledEventData {
}
export interface GuildScheduledEventDeleteEventData extends GuildScheduledEventData {
}
export interface GuildScheduledEventUserAddEventData {
    guild_scheduled_event_id: SnowflakeData;
    user_id: SnowflakeData;
    guild_id: SnowflakeData;
}
export interface GuildScheduledEventUserRemoveEventData {
    guild_scheduled_event_id: SnowflakeData;
    user_id: SnowflakeData;
    guild_id: SnowflakeData;
}
export interface IntegrationCreateEventData extends IntegrationData {
    guild_id: SnowflakeData;
}
export interface IntegrationUpdateEventData extends IntegrationData {
    guild_id: SnowflakeData;
}
export interface IntegrationDeleteEventData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    application_id?: SnowflakeData;
}
export interface InviteCreateEventData {
    channel_id: SnowflakeData;
    code: string;
    create_at: Timestamp;
    guild_id?: SnowflakeData;
    inviter?: UserData;
    max_age: number;
    max_uses: number;
    target_type?: InviteTargetType;
    target_user?: UserData;
    target_application?: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
    temporary: boolean;
    uses: number;
}
export interface InviteDeleteEventData {
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
    code: string;
}
export interface MessageCreateEventData extends MessageData {
    guild_id?: SnowflakeData;
    member?: GuildMemberData;
    mentions: GuildMemberMentionData[];
}
export interface MessageUpdateEventData extends MessageCreateEventData {
}
export interface MessageDeleteEventData {
    id: SnowflakeData;
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageDeleteBulkEventData {
    ids: SnowflakeData[];
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageReactionAddEventData {
    user_id: SnowflakeData;
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    member?: GuildMemberData;
    emoji: EmojiData;
}
export interface MessageReactionRemoveEventData {
    user_id: SnowflakeData;
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    emoji: EmojiData;
}
export interface MessageReactionRemoveAllEventData {
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
}
export interface MessageReactionRemoveEmojiEventData {
    channel_id: SnowflakeData;
    message_id: SnowflakeData;
    guild_id?: SnowflakeData;
    emoji: EmojiData;
}
export interface PresenceUpdateEventData {
    user: UserData;
    guild_id: SnowflakeData;
    status: string;
    activities: ActivityData[];
    client_status: ClientStatusData;
}
export interface TypingStartEventData {
    channel_id: SnowflakeData;
    guild_id?: SnowflakeData;
    user_id: SnowflakeData;
    timestamp: number;
    member?: GuildMemberData;
}
export interface UserUpdateEventData extends UserData {
}
export interface VoiceStateUpdateEventData extends VoiceStateData {
}
export interface VoiceServerUpdateEventData {
    token: string;
    guild_id: SnowflakeData;
    endpoint: string | null;
}
export interface WebhookUpdateEventData {
    guild_id: SnowflakeData;
    channel_id: SnowflakeData;
}
export interface InteractionCreateEventData extends InteractionData {
}
export interface StageInstanceCreateEventData extends StageInstanceData {
}
export interface StageInstanceUpdateEventData extends StageInstanceData {
}
export interface StageInstanceDeleteEventData extends StageInstanceData {
}
export interface WSObject {
    gateway_commands: {
        getMember: (...params: any) => Promise<void>;
        setPresence: (...params: any) => Promise<void>;
        setVoiceState: (...params: any) => Promise<void>;
    };
}
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
export interface PresenceUpdateData {
    user: UserData;
    guild_id: SnowflakeData;
    status: string;
    activities: ActivityData[];
    client_status: ClientStatusData;
}
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
export interface UserData {
    id: SnowflakeData;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string | null;
    accent_color?: number | null;
    locale?: LocaleOption;
    verified?: boolean;
    email?: string | null;
    flags?: UserFlags;
    premium_type?: PremiumTypes;
    public_flags?: UserFlags;
}
export interface ApplicationData {
    id: SnowflakeData;
    name: string;
    icon: string | null;
    flags: ApplicationFlag;
}
export interface UnavailableGuildData {
    id: SnowflakeData;
    unavailable?: boolean;
}
export declare type SnowflakeData = bigint | string;
export declare type LocaleOption = "da" | "de" | "en-GB" | "en-US" | "es-ES" | "fr" | "hr" | "it" | "lt" | "hu" | "nl" | "no" | "pl" | "pt-BR" | "ro" | "fi" | "sv-SE" | "vi" | "tr" | "cs" | "el" | "bg" | "ru" | "uk" | "hi" | "th" | "zh-CN" | "ja" | "zh-TW" | "ko";
export declare enum UserFlags {
    STAFF = 1,
    PARTNER = 2,
    HYPESQUAD = 4,
    BUG_HUNTER_LEVEL_1 = 8,
    HYPESQUAD_ONLINE_HOUSE_1 = 64,
    HYPESQUAD_ONLINE_HOUSE_2 = 128,
    HYPESQUAD_ONLINE_HOUSE_3 = 256,
    PREMIUM_EARLY_SUPPORTER = 512,
    TEAM_PSEUDO_USER = 1024,
    BUG_HUNTER_LEVEL_2 = 16384,
    VERIFIED_BOT = 65536,
    VERIFIED_DEVELOPER = 131072,
    CERTIFIED_MODERATOR = 262144,
    BOT_HTTP_INTERACTIONS = 524288
}
export declare enum PremiumTypes {
    None = 0,
    Classic = 1,
    Nitro = 2
}
export interface EmojiData {
    id: SnowflakeData | null;
    name: string | null;
    roles?: RoleData[];
    user?: UserData;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}
export declare type GuildFeature = "ANIMATED_BANNER" | "ANIMATED_ICON" | "BANNER" | "COMMERCE" | "COMMUNITY" | "DISCOVERABLE" | "FEATURABLE" | "INVITE_SPLASH" | "MEMBER_VERIFICATION_GATE_ENABLED" | "MONETIZATION_ENABLED" | "MORE_STICKERS" | "NEWS" | "PARTNERED" | "PREVIEW_ENABLED" | "PRIVATE_THREADS" | "ROLE_ICONS" | "TICKETED_EVENTS_ENABLED" | "VANITY_URL" | "VERIFIED" | "VIP_REGIONS" | "WELCOME_SCREEN_ENABLED";
export interface StickerData {
    id: SnowflakeData;
    pack_id?: SnowflakeData;
    name: string;
    description: string | null;
    tags: string;
    asset?: "";
    type: StickerTypes;
    format: StickerFormatTypes;
    available?: boolean;
    guild_id?: SnowflakeData;
    user?: UserData;
    sort_value?: number;
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
export declare enum StickerTypes {
    STANDARD = 1,
    GUILD = 2
}
export declare enum StickerFormatTypes {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3
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
export interface OverwriteData {
    id: SnowflakeData;
    type: number;
    allow: string;
    deny: string;
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
export declare enum VideoQualityModes {
    AUTO = 1,
    FULL = 2
}
export declare enum ChannelFlags {
    PINNED = 2
}
export interface VoiceRegionData {
    id: string;
    name: string;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}
export declare enum VerificationLevel {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    VERY_HIGH = 4
}
export declare enum DefaultMessageNotificationLevel {
    ALL_MESSAGES = 0,
    ONLY_MENTIONS = 1
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
export declare enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 2,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 4,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 8
}
export declare enum PremiumTier {
    NONE = 0,
    TIER_1 = 1,
    TIER_2 = 2,
    TIER_3 = 3
}
export interface WelcomeScreenData {
    description: string | null;
    welcome_channels: WelcomeScreenChannelData;
}
export interface WelcomeScreenChannelData {
    channel_id: SnowflakeData;
    description: string;
    emoji_id: SnowflakeData | null;
    emoji_name: string | null;
}
export declare enum GuildNSFWLevel {
    DEFAULT = 0,
    EXPLICIT = 1,
    SAFE = 2,
    AGE_RESTRICTED = 3
}
export interface ActivityData {
    name: string;
    type: ActivityTypes;
    url?: string | null;
    created_at: number;
    timestamps?: ActivityTimestamps;
    application_id?: SnowflakeData;
    details?: string | null;
    state?: string | null;
    emoji?: ActivityEmoji | null;
    party?: ActivityParty;
    assets?: ActivityAssets;
    secrets?: ActivitySecrets;
    instance?: boolean;
    flags: ActivityFlags;
    buttons?: ActivityButtons;
}
export declare enum ActivityTypes {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}
export interface ActivityTimestamps {
    start?: number;
    end?: number;
}
export interface ActivityEmoji {
    name: string;
    id?: SnowflakeData;
    animated?: boolean;
}
export interface ActivityParty {
    id?: string;
    size?: [number, number];
}
export interface ActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}
export interface ActivitySecrets {
    join?: string;
    spectate?: string;
    match?: string;
}
export declare enum ActivityFlags {
    INSTANCE = 1,
    JOIN = 2,
    SPECTATE = 4,
    JOIN_REQUEST = 8,
    SYNC = 16,
    PLAY = 32,
    PARTY_PRIVACY_FRIENDS = 64,
    PARTY_PRIVACY_VOICE_CHANNEL = 128,
    EMBEDDED = 256
}
export interface ActivityButtons {
    label: string;
    url: string;
}
export interface ClientStatusData {
    desktop?: string;
    mobile?: string;
    web?: string;
}
export interface StageInstanceData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    channel_id: SnowflakeData;
    topic: string;
    privacy_level: PrivacyLevel;
    discoverable_disabled: boolean;
    guild_scheduled_event_id: SnowflakeData | null;
}
export declare enum PrivacyLevel {
    PUBLIC = 1,
    GUILD_ONLY = 2
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
export interface ApplicationCommandPermissionsData {
    id: SnowflakeData;
    type: ApplicationCommandPermissionsType;
    permission: boolean;
}
export declare enum ApplicationCommandPermissionsType {
    ROLE = 1,
    USER = 2,
    CHANNEL = 3
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
export declare enum InviteTargetType {
    STREAM = 1,
    EMBEDDED_APPLICATION = 2
}
export interface MessageData {
    id: SnowflakeData;
    channel_id: SnowflakeData;
    author: UserData;
    content: string;
    timestamp: Timestamp;
    edited_timestamp: Timestamp | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: UserData[];
    mention_roles: RoleData[];
    mention_channels: ChannelMentionData[];
    attachments: AttachmentData[];
    embeds: EmbedData[];
    reactions: ReactionData[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: SnowflakeData;
    type: MessageType;
    activity?: MessageActivityData;
    application?: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
    application_id?: SnowflakeData;
    message_reference?: MessageReferenceData;
    flag?: MessageFlag;
    referenced_message?: MessageData | null;
    interaction?: MessageInteractionData;
    thread?: ChannelData;
    components?: MessageComponentData[];
    sticker_items?: MessageStickerItemData[];
    stickers?: StickerData[];
}
export interface ChannelMentionData {
    id: SnowflakeData;
    guild_id: SnowflakeData;
    type: ChannelTypes;
    name: string;
}
export interface AttachmentData {
    id: SnowflakeData;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
}
export interface EmbedData {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: Timestamp;
    color?: number;
    footer?: EmbedFooterData;
    image?: EmbedImageData;
    thumbnail?: EmbedThumbnailData;
    video?: EmbedVideoData;
    provider?: EmbedProviderData;
    author?: EmbedAuthorData;
    fields?: EmbedFieldData[];
}
export interface EmbedFooterData {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface EmbedImageData {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
export interface EmbedThumbnailData {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
export interface EmbedVideoData {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
export interface EmbedProviderData {
    name?: string;
    url?: string;
}
export interface EmbedAuthorData {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface EmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
}
export interface ReactionData {
    count: number;
    me: boolean;
    emoji: EmojiData;
}
export declare enum MessageType {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23
}
export interface MessageActivityData {
    type: MessageActivityType;
    party_id?: string;
}
export declare enum MessageActivityType {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 4
}
export declare enum ApplicationFlag {
    GATEWAY_PRESENCE = 4096,
    GATEWAY_PRESENCE_LIMITED = 8192,
    GATEWAY_GUILD_MEMBERS = 16384,
    GATEWAY_GUILD_MEMBERS_LIMITED = 32768,
    VERIFICATION_PENDING_GUILD_LIMIT = 65536,
    EMBEDDED = 131072,
    GATEWAY_MESSAGE_CONTENT = 262144,
    GATEWAY_MESSAGE_CONTENT_LIMITED = 524288
}
export interface MessageReferenceData {
    message_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    guild_id?: SnowflakeData;
    fail_if_not_exists?: boolean;
}
export declare enum MessageFlag {
    CROSSPOSTED = 1,
    IS_CROSSPOST = 2,
    SUPPRESS_EMBEDS = 4,
    SOURCE_MESSAGE_DELETED = 8,
    URGENT = 16,
    HAS_THREAD = 32,
    EPHEMERAL = 64,
    LOADING = 128,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 256
}
export interface MessageInteractionData {
    id: SnowflakeData;
    type: InteractionType;
    name: string;
    user: UserData;
    member?: GuildMemberData;
}
export declare enum InteractionType {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5
}
export interface MessageComponentData {
    content: string;
    components: ActionRowData[];
}
export interface ActionRowData {
    type: ComponentType.ActionRow;
    components: OtherComponentData[];
}
export declare type OtherComponentData = ButtonData | SelectMenuData | TextInputData;
export interface ButtonData {
    type: ComponentType.Button;
    style: ButtonStyle;
    label?: string;
    emoji?: {
        id: SnowflakeData | null;
        name: string | null;
        animated?: boolean;
    };
    custom_id: string;
    url?: string;
    disabled?: boolean;
    row: number;
}
export interface SelectMenuData {
    type: ComponentType.SelectMenu;
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
    row: number;
}
export interface TextInputData {
    type: ComponentType.TextInput;
    custom_id: string;
    style: TextInputStyle;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}
export declare enum ComponentType {
    ActionRow = 1,
    Button = 2,
    SelectMenu = 3,
    TextInput = 4
}
export declare enum ButtonStyle {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5,
    Blurple = 1,
    Grey = 2,
    Green = 3,
    Red = 4,
    URL = 5
}
export interface SelectOption {
    label: string;
    value: string;
    description?: string;
    emoji?: {
        id: SnowflakeData | null;
        name: string | null;
        animated?: boolean;
    };
    default?: boolean;
}
export declare enum TextInputStyle {
    Short = 1,
    Paragraph = 2
}
export interface MessageStickerItemData {
    id: SnowflakeData;
    name: string;
    format_type: StickerFormatTypes;
}
export interface GuildMemberMentionData extends UserData {
    member: GuildMemberData;
}
export interface InteractionData {
    id: SnowflakeData;
    application_id: SnowflakeData;
    type: InteractionType;
    data?: IApplicationCommandData | IMessageComponentData | IModalSubmitData;
    guild_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    member?: GuildMemberData;
    user?: UserData;
    token: string;
    version: 1;
    message: MessageData | MessageInteractionData;
    locale?: LocaleOption;
    guild_locale?: LocaleOption;
}
export interface IApplicationCommandData {
    id: SnowflakeData;
    name: string;
    type: InteractionType;
    resolved?: ResolveDataData;
    options?: ApplicationCommandInteractionDataOptionData[];
    guild_id?: SnowflakeData;
    target_id?: SnowflakeData;
}
export interface IMessageComponentData {
    custom_id: string;
    component_type: ComponentType;
    values?: SelectOption[];
}
export interface IModalSubmitData {
    custom_id: string;
    components: MessageComponentData[];
}
export interface ResolveDataData {
    users?: Map<SnowflakeData, UserData>;
    members?: Map<SnowflakeData, GuildMemberData>;
    roles?: Map<SnowflakeData, RoleData>;
    channels?: Map<SnowflakeData, ChannelData>;
    messages?: Map<SnowflakeData, MessageData>;
    attachments?: Map<SnowflakeData, AttachmentData>;
}
export interface ApplicationCommandInteractionDataOptionData {
    name: string;
    type: ApplicationCommandOptionType;
    value?: number | string;
    options?: ApplicationCommandInteractionDataOptionData[];
    focused?: boolean;
}
export declare enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}
export interface ApplicationCommandData {
    id: SnowflakeData;
    type?: ApplicationCommandType;
    application_id: SnowflakeData;
    guild_id?: SnowflakeData;
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    description: string;
    description_localizations?: {
        [k: string]: string;
    } | null;
    options?: ApplicationCommandOptionData[];
    default_member_permissions: string | null;
    dm_permission?: boolean;
    default_permission?: boolean | null;
    version: SnowflakeData;
}
export declare enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}
export interface ApplicationCommandOptionData {
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    description: string;
    description_localizations?: {
        [k: string]: string;
    } | null;
    required?: boolean;
    choices?: ApplicationCommandOptionChoiceData[];
    options?: ApplicationCommandOptionData[];
    channel_types: ChannelTypes[];
    min_value?: number;
    max_value?: number;
    autocomplete?: boolean;
}
export interface ApplicationCommandOptionChoiceData {
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    value: string | number;
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
    stage_instance?: InviteStageInstanceData;
    guild_scheduled_event?: GuildScheduledEventData;
}
export interface InviteStageInstanceData {
    members: Partial<GuildMemberData>[];
    participant_count: number;
    speaker_count: number;
    topic: string;
}
export interface InviteMetadata {
    uses: number;
    max_uses: number;
    max_age: number;
    temporary: boolean;
    created_at: Timestamp;
}
export interface ModalData {
    title: string;
    custom_id: string;
    components: [
        {
            type: ComponentType.ActionRow;
            components: TextInputData[];
        }
    ];
}
export interface Command<T extends (v: any) => any> {
    name: string;
    run: (data: MessageCreateEventData, ...args: ReturnType<T>[]) => Promise<void>;
    params_type?: T[];
    permissions?: CommandPermissionsFlag;
    description?: string;
    aliases?: string[];
    help?: string;
}
export declare enum CommandPermissionsFlag {
    OWNER = 1,
    ADMINISTRATOR = 2,
    BOT = 4,
    ROLE = 8,
    MEMBER = 16,
    GROUP = 32,
    USER = 64
}
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
export interface Event<T extends EventData> {
    remove: boolean;
    check: (data: T) => boolean;
    listen: (data: T) => Promise<void>;
}
export {};
