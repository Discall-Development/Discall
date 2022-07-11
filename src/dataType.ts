type Timestamp = string;

export interface DiscordData {
    op: number;
    d?: any;
    s?: number;
    t?: string;
}

export enum Intents {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_BANS = 1 << 2,
    GUILD_EMOJIS_AND_STICKERS = 1 << 3,
    GUILD_INTEGRATIONS = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_VOICE_STATES = 1 << 7,
    GUILD_PRESENCES = 1 << 8,
    GUILD_MESSAGES = 1 << 9,
    GUILD_MESSAGE_REACTIONS = 1 << 10,
    GUILD_MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
    MESSAGE_CONTENT = 1 << 15,
    GUILD_SCHEDULED_EVENTS = 1 << 16,
}

export enum Opcode {
    Dispatch,
    Heartbeat,
    Identity,
    PresenceUpdate,
    VoiceStateUpdate,
    Resume = 6,
    Reconnect,
    RequestGuildMember,
    InvalidSession,
    Hello,
    HeartbeatACK,
}

export enum VoiceOpcode {
    Identity,
    SelectProtocol,
    Ready,
    Heartbeat,
    SessionDescription,
    Speaking,
    HeartbeatACK,
    Resume,
    Hello,
    Resumed,
    ClientDisconnect = 13,
}

export interface WSOptions {
    version?: 9 | 10;
    commandTimeout?: number;
}

export interface ReadyEventData {
    v: number;
    user: UserData;
    guilds: UnavailableGuildData[];
    session_id: string;
    shard?: [number, number];
    application: { flags: ApplicationFlag;
        id: SnowflakeData };
}

export interface ResumeEventData {}

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
    target_application?: { flags: ApplicationFlag;
        id: SnowflakeData };
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

export type SnowflakeData = bigint | string;
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

export enum UserFlags {
    STAFF = 1 << 0,
    PARTNER = 1 << 1,
    HYPESQUAD = 1 << 2,
    BUG_HUNTER_LEVEL_1 = 1 << 3,
    HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
    HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
    HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
    PREMIUM_EARLY_SUPPORTER = 1 << 9,
    TEAM_PSEUDO_USER = 1 << 10,
    BUG_HUNTER_LEVEL_2 = 1 << 14,
    VERIFIED_BOT = 1 << 16,
    VERIFIED_DEVELOPER = 1 << 17,
    CERTIFIED_MODERATOR = 1 << 18,
    BOT_HTTP_INTERACTIONS = 1 << 19,
}

export enum PremiumTypes {
    None, Classic, Nitro,
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

export type GuildFeature =
    | "ANIMATED_BANNER"
    | "ANIMATED_ICON"
    | "BANNER"
    | "COMMERCE"
    | "COMMUNITY"
    | "DISCOVERABLE"
    | "FEATURABLE"
    | "INVITE_SPLASH"
    | "MEMBER_VERIFICATION_GATE_ENABLED"
    | "MONETIZATION_ENABLED"
    | "MORE_STICKERS"
    | "NEWS"
    | "PARTNERED"
    | "PREVIEW_ENABLED"
    | "PRIVATE_THREADS"
    | "ROLE_ICONS"
    | "TICKETED_EVENTS_ENABLED"
    | "VANITY_URL"
    | "VERIFIED"
    | "VIP_REGIONS"
    | "WELCOME_SCREEN_ENABLED";

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

export enum StickerTypes {
    STANDARD = 1, GUILD,
}

export enum StickerFormatTypes {
    PNG = 1, APNG, LOTTIE,
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

export enum VideoQualityModes {
    AUTO = 1, FULL,
}

export enum ChannelFlags {
    PINNED = 1 << 1,
}

export interface VoiceRegionData {
    id: string;
    name: string;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}

export enum VerificationLevel {
    NONE, LOW, MEDIUM, HIGH, VERY_HIGH,
}

export enum DefaultMessageNotificationLevel {
    ALL_MESSAGES, ONLY_MENTIONS,
}

export enum ExplicitContentFilterLevel {
    DISABLED, MEMBERS_WITHOUT_ROLES, ALL_MEMBERS,
}

export enum MFALevel {
    NONE, ELEVATED,
}

export enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
}

export enum PremiumTier {
    NONE, TIER_1, TIER_2, TIER_3,
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

export enum GuildNSFWLevel {
    DEFAULT, EXPLICIT, SAFE, AGE_RESTRICTED,
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

export enum ActivityTypes {
    Game, // Playing {name}
    Streaming, // Streaming {details}
    Listening, // Listening to {name}
    Watching, // Watching {name}
    Custom, // {emoji} {name}
    Competing, // Competing in {name}
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

export enum ActivityFlags {
    INSTANCE = 1 << 0,
    JOIN = 1 << 1,
    SPECTATE = 1 << 2,
    JOIN_REQUEST = 1 << 3,
    SYNC = 1 << 4,
    PLAY = 1 << 5,
    PARTY_PRIVACY_FRIENDS = 1 << 6,
    PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
    EMBEDDED = 1 << 8,
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

export enum PrivacyLevel {
    PUBLIC = 1, GUILD_ONLY,
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

export interface ApplicationCommandPermissionsData {
    id: SnowflakeData;
    type: ApplicationCommandPermissionsType;
    permission: boolean;
}

export enum ApplicationCommandPermissionsType {
    ROLE = 1, USER, CHANNEL,
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

export enum InviteTargetType {
    STREAM = 1, EMBEDDED_APPLICATION,
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
    application?: { flags: ApplicationFlag;
        id: SnowflakeData };
    application_id?: SnowflakeData;
    message_reference?: MessageReferenceData;
    flag?: MessageFlag;
    referenced_message?: MessageData | null;
    interaction?: MessageInteractionData;
    thread?: ChannelData;
    components?: MessageComponentData[];
    sticker_items?: MessageStickerItemData[];
    stickers?: StickerData[];
    // Deprecated
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

export enum MessageType {
    DEFAULT,
    RECIPIENT_ADD,
    RECIPIENT_REMOVE,
    CALL,
    CHANNEL_NAME_CHANGE,
    CHANNEL_ICON_CHANGE,
    CHANNEL_PINNED_MESSAGE,
    GUILD_MEMBER_JOIN,
    USER_PREMIUM_GUILD_SUBSCRIPTION,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
    CHANNEL_FOLLOW_ADD,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
    THREAD_CREATED,
    REPLY,
    CHAT_INPUT_COMMAND,
    THREAD_STARTER_MESSAGE,
    GUILD_INVITE_REMINDER,
    CONTEXT_MENU_COMMAND,
}

export interface MessageActivityData {
    type: MessageActivityType;
    party_id?: string;
}

export enum MessageActivityType {
    JOIN = 1, SPECTATE, LISTEN, JOIN_REQUEST,
}

export enum ApplicationFlag {
    GATEWAY_PRESENCE = 1 << 12,
    GATEWAY_PRESENCE_LIMITED = 1 << 13,
    GATEWAY_GUILD_MEMBERS = 1 << 14,
    GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
    VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
    EMBEDDED = 1 << 17,
    GATEWAY_MESSAGE_CONTENT = 1 << 18,
    GATEWAY_MESSAGE_CONTENT_LIMITED = 1 << 19,
}

export interface MessageReferenceData {
    message_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    guild_id?: SnowflakeData;
    fail_if_not_exists?: boolean;
}

export enum MessageFlag {
    CROSSPOSTED = 1 << 0,
    IS_CROSSPOST = 1 << 1,
    SUPPRESS_EMBEDS = 1 << 2,
    SOURCE_MESSAGE_DELETED = 1 << 3,
    URGENT = 1 << 4,
    HAS_THREAD = 1 << 5,
    EPHEMERAL = 1 << 6,
    LOADING = 1 << 7,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
}

export interface MessageInteractionData {
    id: SnowflakeData;
    type: InteractionType;
    name: string;
    user: UserData;
    member?: GuildMemberData;
}

export enum InteractionType {
    PING = 1, APPLICATION_COMMAND, MESSAGE_COMPONENT, APPLICATION_COMMAND_AUTOCOMPLETE, MODAL_SUBMIT,
}

export interface MessageComponentData {
    content: string;
    components: ActionRowData[];
}

export interface ActionRowData {
    type: ComponentType.ActionRow;
    components: OtherComponentData[];
}

export type OtherComponentData = ButtonData | SnowflakeData | TextInputData;

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
}

export interface SelectMenuData {
    type: ComponentType.SelectMenu;
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
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

export enum ComponentType {
    ActionRow = 1, Button, SelectMenu, TextInput,
}

export enum ButtonStyle {
    Primary = 1, Secondary, Success, Danger, Link, Blurple = Primary, Grey, Green, Red, URL,
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

export enum TextInputStyle {
    Short = 1, Paragraph,
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

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1, SUB_COMMAND_GROUP, STRING, INTEGER, BOOLEAN, USER, CHANNEL, ROLE, MENTIONABLE, NUMBER, ATTACHMENT,
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

export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER,
    MESSAGE
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

export enum AllowMentionType {
    Role_Mentions = "roles",
    User_Mentions = "users",
    EveryoneMentions = "everyone"
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

export interface DCommand {
    name: string;
    run: <TArgs extends any[]>(channel: DCommandChannel, ...params: TArgs) => Promise<any>;
    permissions?: DCommandPermissionFlags;
    option?: DCommandOption;
}

export interface DCommandOption {
    description?: string;
    aliases?: string[];
    param_format?: RegExp;
}

export enum DCommandPermissionFlags {
    BOT_OWNER = 1,
    OWNER = 2,
    ADMINISTRATOR = 4,
    ROLE = 8,
    USER = 16,
    GUILD = 32,
    DM = 64,
    GROUP = 128
}

export interface DCommandChannel {
    send: (message: string) => Promise<any>;
    getCommandData: (name: string) => Promise<any>;
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