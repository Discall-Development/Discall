import Snowflake from "./snowflake";

export interface DiscallWSType {
	processer: DiscordDataProcesserType;

	send(data: DiscordData): void;

	get isopen(): boolean;
}

export interface DiscordDataProcesserType {
	Dispatch(data: DiscordData, ws: DiscallWSType): Promise<void>;
	Heartbeat(data: DiscordData, ws: DiscallWSType): Promise<void>;
	Identify(ws: DiscallWSType): Promise<void>;
	VoiceStateUpdate(ws: DiscallWSType): Promise<void>;
	Resume(ws: DiscallWSType): Promise<void>;
	Reconnect(data: DiscordData, ws: DiscallWSType): Promise<void>;
	RequestGuildMembers(ws: DiscallWSType): Promise<void>;
	InvalidSession(data: DiscordData, ws: DiscallWSType): Promise<void>;
	Hello(data: DiscordData, ws: DiscallWSType): Promise<void>;
	HeartbeatACK(data: DiscordData, ws: DiscallWSType): Promise<void>;
}

export interface UnavailableGuildType {
	id: string;
	unavailable: boolean;
}

export interface GuildType {}

export interface BotType {
	user: UserType | null;
	guilds: UnavailableGuildType[];
	session_ids: string[];
	shards: [number, number][]
	application: ApplicationType | null

	emit(event_name: EventName, d: any): Promise<void>;
}

export interface ApplicationType {
	flags: number,
	id: { value: BigInt }
}

export interface UserType {
	readonly id: Snowflake;
	readonly name: string;
	readonly discriminator: string;
	readonly bot?: boolean;
	readonly system?: boolean;
	readonly mfa_enabled?: boolean;
	readonly accent_color?: number | null;
	readonly locale?: LocaleOption;
	readonly verified?: boolean;
	readonly flags?: number;
	readonly premium_type?: number;
	readonly public_flags?: number;
}

export interface DiscordData {
	op: number;
	d?: any;
	s?: number;
	t?: string;
}

export enum OpCode {
	Dispatch,
	Heartbeat,
	Identify,
	PresenceUpdate,
	VoiceStateUpdate,
	Resume = 6,
	Reconnect,
	RequestGuildMembers,
	InvalidSession,
	Hello,
	HeartbeatACK
}

export type EventDataType = ReadyEventData | GuildCreateEventData;

export type EventName = 'READY' | 'GUILD_CREATE';

export interface ReadyEventData {
	v: number;
	user: UserData;
	guilds: UnavailableGuildData[];
	session_id: string;
	shard?: [number, number];
	application: { flags: number, id: SnowflakeData };
}

export interface GuildCreateEventData extends GuildData {
	join_at: string;
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

export interface RoleType {
	
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
	welcome_screen?: WelcomeScreen;
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
	last_pin_timestamp?: string | null;
	rtc_region?: string | null;
	video_quality_mode?: VideQualityModes;
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
	flags: number;
}

export interface UnavailableGuildData {
	id: string;
	unavailable: boolean;
}

export type SnowflakeData = BigInt | string;

export type LocaleOption =
	'da' | 'de' | 'en-GB' | 'en-US' |
	'es-ES' | 'fr' | 'hr' | 'it' |
	'lt' | 'hu' | 'nl' | 'no' |
	'pl' | 'pt-BR' | 'ro' | 'fi' |
	'sv-SE' | 'vi' | 'tr' | 'cs' |
	'el' | 'bg' | 'ru' | 'uk' |
	'hi' | 'th' | 'zh-CN' | 'ja' |
	'zh-TW' | 'ko';

export enum UserFlags {
	STAFF                    = 1 << 0,
	PARTNER                  = 1 << 1,
	HYPESQUAD                = 1 << 2,
	BUG_HUNTER_LEVEL_1       = 1 << 3,
	HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
	HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
	HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
	PREMIUM_EARLY_SUPPORTER  = 1 << 9,
	TEAM_PSEUDO_USER         = 1 << 10,
	BUG_HUNTER_LEVEL_2       = 1 << 14,
	VERIFIED_BOT             = 1 << 16,
	VERIFIED_DEVELOPER       = 1 << 17,
	CERTIFIED_MODERATOR      = 1 << 18,
	BOT_HTTP_INTERACTIONS    = 1 << 19
}

export enum PremiumTypes {
	None,
	Classic,
	Nitro
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
	'ANIMATED_BANNER' | 'ANIMATED_ICON' | 'BANNER' |
	'COMMERCE' | 'COMMUNITY' | 'DISCOVERABLE' | 'FEATURABLE' |
	'INVITE_SPLASH' | 'MEMBER_VERIFICATION_GATE_ENABLED' |
	'MONETIZATION_ENABLED' | 'MORE_STICKERS' | 'NEWS' |
	'PARTNERED' | 'PREVIEW_ENABLED' | 'PRIVATE_THREADS' |
	'ROLE_ICONS' | 'TICKETED_EVENTS_ENABLED' | 'VANITY_URL' |
	'VERIFIED' | 'VIP_REGIONS' | 'WELCOME_SCREEN_ENABLED';

export interface StickerData {
	id: SnowflakeData;
	pack_id?: SnowflakeData;
	name: string;
	description: string | null;
	tags: string;
	asset?: '';
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
	STANDARD = 1,
	GUILD
}

export enum StickerFormatTypes {
	PNG = 1,
	APNG,
	LOTTIE
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
	request_to_speak_timestamp: string | null;
}

export interface GuildMemberData {
	user?: UserData;
	nick?: string | null;
	avatar?: string | null;
	roles: SnowflakeData[];
	join_at: string;
	premium_since?: string | null;
	deaf: boolean;
	mute: boolean;
	pending?: boolean;
	permission?: string;
	communication_disabled_until?: string | null;
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
	archive_timestamp: string;
	locked: boolean;
	invitable?: boolean;
	create_timestamp?: string | null;
}

export interface ThreadMemberData {
	id?: SnowflakeData;
	user_id?: SnowflakeData;
	join_timestamp: string;
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
	GUILD_FORUM
}

export enum VideQualityModes {
	AUTO = 1,
	FULL
}

export enum ChannelFlags {
	PINNED = 1 << 1
}

export interface VoiceRegionData {
	id: string;
	name: string;
	optimal: boolean;
	deprecated: boolean;
	custom: boolean;
}

export enum VerificationLevel {
	NONE,
	LOW,
	MEDIUM,
	HIGH,
	VERY_HIGH
}

export enum DefaultMessageNotificationLevel {
	ALL_MESSAGES,
	ONLY_MENTIONS
}

export enum ExplicitContentFilterLevel {
	DISABLED,
	MEMBERS_WITHOUT_ROLES,
	ALL_MEMBERS
}

export enum MFALevel {
	NONE,
	ELEVATED
}

export enum SystemChannelFlags {
	SUPPRESS_JOIN_NOTIFICATIONS           = 1 << 0,
	SUPPRESS_PREMIUM_SUBSCRIPTIONS        = 1 << 1,
	SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
	SUPPRESS_JOIN_NOTIFICATION_REPLIES    = 1 << 3
}

export enum PremiumTier {
	NONE,
	TIER_1,
	TIER_2,
	TIER_3
}

export interface WelcomeScreen {
	description: string | null;
	welcome_channels: WelcomeScreenChannel;
}

export interface WelcomeScreenChannel {
	channel_id: SnowflakeData;
	description: string;
	emoji_id: SnowflakeData | null;
	emoji_name: string | null;
}
export enum GuildNSFWLevel {
	DEFAULT,
	EXPLICIT,
	SAFE,
	AGE_RESTRICTED
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
	Game,      // Playing {name}
	Streaming, // Streaming {details}
	Listening, // Listening to {name}
	Watching,  // Watching {name}
	Custom,    // {emoji} {name}
	Competing  // Competing in {name}
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
	INSTANCE                    = 1 << 0,
	JOIN                        = 1 << 1,
	SPECTATE                    = 1 << 2,
	JOIN_REQUEST                = 1 << 3,
	SYNC                        = 1 << 4,
	PLAY                        = 1 << 5,
	PARTY_PRIVACY_FRIENDS       = 1 << 6,
	PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
	EMBEDDED                    = 1 << 8
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
	PUBLIC = 1,
	GUILD_ONLY
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
	GUILD_ONLY = 2
}

export enum GuildScheduledEventStatus {
	SCHEDULED = 1,
	ACTIVE,
	COMPLETED,
	CANCELED
}

export enum GuildScheduledEventEntityType {
	STAGE_INSTANCE = 1,
	VOICE,
	EXTERNAL
}

export interface GuildScheduledEventEntityMetadata {
	location?: string;
}