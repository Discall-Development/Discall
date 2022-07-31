"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookType = exports.CommandPermissionsFlag = exports.PermissionFlags = exports.AllowMentionType = exports.ApplicationCommandType = exports.ApplicationCommandOptionType = exports.TextInputStyle = exports.ButtonStyle = exports.ComponentType = exports.InteractionType = exports.MessageFlag = exports.ApplicationFlag = exports.MessageActivityType = exports.MessageType = exports.InviteTargetType = exports.IntegrationExpireBehaviors = exports.ApplicationCommandPermissionsType = exports.GuildScheduledEventEntityType = exports.GuildScheduledEventStatus = exports.GuildScheduledEventPrivacyLevel = exports.PrivacyLevel = exports.ActivityFlags = exports.ActivityTypes = exports.GuildNSFWLevel = exports.PremiumTier = exports.SystemChannelFlags = exports.MFALevel = exports.ExplicitContentFilterLevel = exports.DefaultMessageNotificationLevel = exports.VerificationLevel = exports.ChannelFlags = exports.VideoQualityModes = exports.ChannelTypes = exports.StickerFormatTypes = exports.StickerTypes = exports.PremiumTypes = exports.UserFlags = exports.VoiceOpcode = exports.Opcode = exports.Intents = void 0;
var Intents;
(function (Intents) {
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    Intents[Intents["GUILD_BANS"] = 4] = "GUILD_BANS";
    Intents[Intents["GUILD_EMOJIS_AND_STICKERS"] = 8] = "GUILD_EMOJIS_AND_STICKERS";
    Intents[Intents["GUILD_INTEGRATIONS"] = 16] = "GUILD_INTEGRATIONS";
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    Intents[Intents["GUILD_VOICE_STATES"] = 128] = "GUILD_VOICE_STATES";
    Intents[Intents["GUILD_PRESENCES"] = 256] = "GUILD_PRESENCES";
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    Intents[Intents["GUILD_MESSAGE_REACTIONS"] = 1024] = "GUILD_MESSAGE_REACTIONS";
    Intents[Intents["GUILD_MESSAGE_TYPING"] = 2048] = "GUILD_MESSAGE_TYPING";
    Intents[Intents["DIRECT_MESSAGES"] = 4096] = "DIRECT_MESSAGES";
    Intents[Intents["DIRECT_MESSAGE_REACTIONS"] = 8192] = "DIRECT_MESSAGE_REACTIONS";
    Intents[Intents["DIRECT_MESSAGE_TYPING"] = 16384] = "DIRECT_MESSAGE_TYPING";
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
    Intents[Intents["GUILD_SCHEDULED_EVENTS"] = 65536] = "GUILD_SCHEDULED_EVENTS";
})(Intents = exports.Intents || (exports.Intents = {}));
var Opcode;
(function (Opcode) {
    Opcode[Opcode["Dispatch"] = 0] = "Dispatch";
    Opcode[Opcode["Heartbeat"] = 1] = "Heartbeat";
    Opcode[Opcode["Identity"] = 2] = "Identity";
    Opcode[Opcode["PresenceUpdate"] = 3] = "PresenceUpdate";
    Opcode[Opcode["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
    Opcode[Opcode["Resume"] = 6] = "Resume";
    Opcode[Opcode["Reconnect"] = 7] = "Reconnect";
    Opcode[Opcode["RequestGuildMember"] = 8] = "RequestGuildMember";
    Opcode[Opcode["InvalidSession"] = 9] = "InvalidSession";
    Opcode[Opcode["Hello"] = 10] = "Hello";
    Opcode[Opcode["HeartbeatACK"] = 11] = "HeartbeatACK";
})(Opcode = exports.Opcode || (exports.Opcode = {}));
var VoiceOpcode;
(function (VoiceOpcode) {
    VoiceOpcode[VoiceOpcode["Identity"] = 0] = "Identity";
    VoiceOpcode[VoiceOpcode["SelectProtocol"] = 1] = "SelectProtocol";
    VoiceOpcode[VoiceOpcode["Ready"] = 2] = "Ready";
    VoiceOpcode[VoiceOpcode["Heartbeat"] = 3] = "Heartbeat";
    VoiceOpcode[VoiceOpcode["SessionDescription"] = 4] = "SessionDescription";
    VoiceOpcode[VoiceOpcode["Speaking"] = 5] = "Speaking";
    VoiceOpcode[VoiceOpcode["HeartbeatACK"] = 6] = "HeartbeatACK";
    VoiceOpcode[VoiceOpcode["Resume"] = 7] = "Resume";
    VoiceOpcode[VoiceOpcode["Hello"] = 8] = "Hello";
    VoiceOpcode[VoiceOpcode["Resumed"] = 9] = "Resumed";
    VoiceOpcode[VoiceOpcode["ClientDisconnect"] = 13] = "ClientDisconnect";
})(VoiceOpcode = exports.VoiceOpcode || (exports.VoiceOpcode = {}));
var UserFlags;
(function (UserFlags) {
    UserFlags[UserFlags["STAFF"] = 1] = "STAFF";
    UserFlags[UserFlags["PARTNER"] = 2] = "PARTNER";
    UserFlags[UserFlags["HYPESQUAD"] = 4] = "HYPESQUAD";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_1"] = 8] = "BUG_HUNTER_LEVEL_1";
    UserFlags[UserFlags["HYPESQUAD_ONLINE_HOUSE_1"] = 64] = "HYPESQUAD_ONLINE_HOUSE_1";
    UserFlags[UserFlags["HYPESQUAD_ONLINE_HOUSE_2"] = 128] = "HYPESQUAD_ONLINE_HOUSE_2";
    UserFlags[UserFlags["HYPESQUAD_ONLINE_HOUSE_3"] = 256] = "HYPESQUAD_ONLINE_HOUSE_3";
    UserFlags[UserFlags["PREMIUM_EARLY_SUPPORTER"] = 512] = "PREMIUM_EARLY_SUPPORTER";
    UserFlags[UserFlags["TEAM_PSEUDO_USER"] = 1024] = "TEAM_PSEUDO_USER";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_2"] = 16384] = "BUG_HUNTER_LEVEL_2";
    UserFlags[UserFlags["VERIFIED_BOT"] = 65536] = "VERIFIED_BOT";
    UserFlags[UserFlags["VERIFIED_DEVELOPER"] = 131072] = "VERIFIED_DEVELOPER";
    UserFlags[UserFlags["CERTIFIED_MODERATOR"] = 262144] = "CERTIFIED_MODERATOR";
    UserFlags[UserFlags["BOT_HTTP_INTERACTIONS"] = 524288] = "BOT_HTTP_INTERACTIONS";
})(UserFlags = exports.UserFlags || (exports.UserFlags = {}));
var PremiumTypes;
(function (PremiumTypes) {
    PremiumTypes[PremiumTypes["None"] = 0] = "None";
    PremiumTypes[PremiumTypes["Classic"] = 1] = "Classic";
    PremiumTypes[PremiumTypes["Nitro"] = 2] = "Nitro";
})(PremiumTypes = exports.PremiumTypes || (exports.PremiumTypes = {}));
var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes = exports.StickerTypes || (exports.StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
})(StickerFormatTypes = exports.StickerFormatTypes || (exports.StickerFormatTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_NEWS"] = 5] = "GUILD_NEWS";
    ChannelTypes[ChannelTypes["GUILD_NEWS_THREAD"] = 10] = "GUILD_NEWS_THREAD";
    ChannelTypes[ChannelTypes["GUILD_PUBLIC_THREAD"] = 11] = "GUILD_PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["GUILD_PRIVATE_THREAD"] = 12] = "GUILD_PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
var VideoQualityModes;
(function (VideoQualityModes) {
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes = exports.VideoQualityModes || (exports.VideoQualityModes = {}));
var ChannelFlags;
(function (ChannelFlags) {
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
})(ChannelFlags = exports.ChannelFlags || (exports.ChannelFlags = {}));
var VerificationLevel;
(function (VerificationLevel) {
    VerificationLevel[VerificationLevel["NONE"] = 0] = "NONE";
    VerificationLevel[VerificationLevel["LOW"] = 1] = "LOW";
    VerificationLevel[VerificationLevel["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevel[VerificationLevel["HIGH"] = 3] = "HIGH";
    VerificationLevel[VerificationLevel["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevel = exports.VerificationLevel || (exports.VerificationLevel = {}));
var DefaultMessageNotificationLevel;
(function (DefaultMessageNotificationLevel) {
    DefaultMessageNotificationLevel[DefaultMessageNotificationLevel["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    DefaultMessageNotificationLevel[DefaultMessageNotificationLevel["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
})(DefaultMessageNotificationLevel = exports.DefaultMessageNotificationLevel || (exports.DefaultMessageNotificationLevel = {}));
var ExplicitContentFilterLevel;
(function (ExplicitContentFilterLevel) {
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["DISABLED"] = 0] = "DISABLED";
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    ExplicitContentFilterLevel[ExplicitContentFilterLevel["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevel = exports.ExplicitContentFilterLevel || (exports.ExplicitContentFilterLevel = {}));
var MFALevel;
(function (MFALevel) {
    MFALevel[MFALevel["NONE"] = 0] = "NONE";
    MFALevel[MFALevel["ELEVATED"] = 1] = "ELEVATED";
})(MFALevel = exports.MFALevel || (exports.MFALevel = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
})(SystemChannelFlags = exports.SystemChannelFlags || (exports.SystemChannelFlags = {}));
var PremiumTier;
(function (PremiumTier) {
    PremiumTier[PremiumTier["NONE"] = 0] = "NONE";
    PremiumTier[PremiumTier["TIER_1"] = 1] = "TIER_1";
    PremiumTier[PremiumTier["TIER_2"] = 2] = "TIER_2";
    PremiumTier[PremiumTier["TIER_3"] = 3] = "TIER_3";
})(PremiumTier = exports.PremiumTier || (exports.PremiumTier = {}));
var GuildNSFWLevel;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFWLevel[GuildNSFWLevel["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFWLevel[GuildNSFWLevel["SAFE"] = 2] = "SAFE";
    GuildNSFWLevel[GuildNSFWLevel["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevel = exports.GuildNSFWLevel || (exports.GuildNSFWLevel = {}));
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["Game"] = 0] = "Game";
    ActivityTypes[ActivityTypes["Streaming"] = 1] = "Streaming";
    ActivityTypes[ActivityTypes["Listening"] = 2] = "Listening";
    ActivityTypes[ActivityTypes["Watching"] = 3] = "Watching";
    ActivityTypes[ActivityTypes["Custom"] = 4] = "Custom";
    ActivityTypes[ActivityTypes["Competing"] = 5] = "Competing";
})(ActivityTypes = exports.ActivityTypes || (exports.ActivityTypes = {}));
var ActivityFlags;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["INSTANCE"] = 1] = "INSTANCE";
    ActivityFlags[ActivityFlags["JOIN"] = 2] = "JOIN";
    ActivityFlags[ActivityFlags["SPECTATE"] = 4] = "SPECTATE";
    ActivityFlags[ActivityFlags["JOIN_REQUEST"] = 8] = "JOIN_REQUEST";
    ActivityFlags[ActivityFlags["SYNC"] = 16] = "SYNC";
    ActivityFlags[ActivityFlags["PLAY"] = 32] = "PLAY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_FRIENDS"] = 64] = "PARTY_PRIVACY_FRIENDS";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_VOICE_CHANNEL"] = 128] = "PARTY_PRIVACY_VOICE_CHANNEL";
    ActivityFlags[ActivityFlags["EMBEDDED"] = 256] = "EMBEDDED";
})(ActivityFlags = exports.ActivityFlags || (exports.ActivityFlags = {}));
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel[PrivacyLevel["PUBLIC"] = 1] = "PUBLIC";
    PrivacyLevel[PrivacyLevel["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(PrivacyLevel = exports.PrivacyLevel || (exports.PrivacyLevel = {}));
var GuildScheduledEventPrivacyLevel;
(function (GuildScheduledEventPrivacyLevel) {
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(GuildScheduledEventPrivacyLevel = exports.GuildScheduledEventPrivacyLevel || (exports.GuildScheduledEventPrivacyLevel = {}));
var GuildScheduledEventStatus;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["SCHEDULED"] = 1] = "SCHEDULED";
    GuildScheduledEventStatus[GuildScheduledEventStatus["ACTIVE"] = 2] = "ACTIVE";
    GuildScheduledEventStatus[GuildScheduledEventStatus["COMPLETED"] = 3] = "COMPLETED";
    GuildScheduledEventStatus[GuildScheduledEventStatus["CANCELED"] = 4] = "CANCELED";
})(GuildScheduledEventStatus = exports.GuildScheduledEventStatus || (exports.GuildScheduledEventStatus = {}));
var GuildScheduledEventEntityType;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["STAGE_INSTANCE"] = 1] = "STAGE_INSTANCE";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["VOICE"] = 2] = "VOICE";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["EXTERNAL"] = 3] = "EXTERNAL";
})(GuildScheduledEventEntityType = exports.GuildScheduledEventEntityType || (exports.GuildScheduledEventEntityType = {}));
var ApplicationCommandPermissionsType;
(function (ApplicationCommandPermissionsType) {
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["ROLE"] = 1] = "ROLE";
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["USER"] = 2] = "USER";
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionsType = exports.ApplicationCommandPermissionsType || (exports.ApplicationCommandPermissionsType = {}));
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["RemoveRole"] = 0] = "RemoveRole";
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["Kick"] = 1] = "Kick";
})(IntegrationExpireBehaviors = exports.IntegrationExpireBehaviors || (exports.IntegrationExpireBehaviors = {}));
var InviteTargetType;
(function (InviteTargetType) {
    InviteTargetType[InviteTargetType["STREAM"] = 1] = "STREAM";
    InviteTargetType[InviteTargetType["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
})(InviteTargetType = exports.InviteTargetType || (exports.InviteTargetType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["DEFAULT"] = 0] = "DEFAULT";
    MessageType[MessageType["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    MessageType[MessageType["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    MessageType[MessageType["CALL"] = 3] = "CALL";
    MessageType[MessageType["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    MessageType[MessageType["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    MessageType[MessageType["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    MessageType[MessageType["GUILD_MEMBER_JOIN"] = 7] = "GUILD_MEMBER_JOIN";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION"] = 8] = "USER_PREMIUM_GUILD_SUBSCRIPTION";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1"] = 9] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2"] = 10] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3"] = 11] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3";
    MessageType[MessageType["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    MessageType[MessageType["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    MessageType[MessageType["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    MessageType[MessageType["REPLY"] = 19] = "REPLY";
    MessageType[MessageType["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    MessageType[MessageType["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    MessageType[MessageType["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    MessageType[MessageType["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageActivityType;
(function (MessageActivityType) {
    MessageActivityType[MessageActivityType["JOIN"] = 1] = "JOIN";
    MessageActivityType[MessageActivityType["SPECTATE"] = 2] = "SPECTATE";
    MessageActivityType[MessageActivityType["LISTEN"] = 3] = "LISTEN";
    MessageActivityType[MessageActivityType["JOIN_REQUEST"] = 4] = "JOIN_REQUEST";
})(MessageActivityType = exports.MessageActivityType || (exports.MessageActivityType = {}));
var ApplicationFlag;
(function (ApplicationFlag) {
    ApplicationFlag[ApplicationFlag["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    ApplicationFlag[ApplicationFlag["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    ApplicationFlag[ApplicationFlag["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    ApplicationFlag[ApplicationFlag["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    ApplicationFlag[ApplicationFlag["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    ApplicationFlag[ApplicationFlag["EMBEDDED"] = 131072] = "EMBEDDED";
    ApplicationFlag[ApplicationFlag["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    ApplicationFlag[ApplicationFlag["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
})(ApplicationFlag = exports.ApplicationFlag || (exports.ApplicationFlag = {}));
var MessageFlag;
(function (MessageFlag) {
    MessageFlag[MessageFlag["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    MessageFlag[MessageFlag["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    MessageFlag[MessageFlag["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    MessageFlag[MessageFlag["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    MessageFlag[MessageFlag["URGENT"] = 16] = "URGENT";
    MessageFlag[MessageFlag["HAS_THREAD"] = 32] = "HAS_THREAD";
    MessageFlag[MessageFlag["EPHEMERAL"] = 64] = "EPHEMERAL";
    MessageFlag[MessageFlag["LOADING"] = 128] = "LOADING";
    MessageFlag[MessageFlag["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
})(MessageFlag = exports.MessageFlag || (exports.MessageFlag = {}));
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["PING"] = 1] = "PING";
    InteractionType[InteractionType["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    InteractionType[InteractionType["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    InteractionType[InteractionType["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    InteractionType[InteractionType["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    ComponentType[ComponentType["Button"] = 2] = "Button";
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
    ButtonStyle[ButtonStyle["Blurple"] = 1] = "Blurple";
    ButtonStyle[ButtonStyle["Grey"] = 2] = "Grey";
    ButtonStyle[ButtonStyle["Green"] = 3] = "Green";
    ButtonStyle[ButtonStyle["Red"] = 4] = "Red";
    ButtonStyle[ButtonStyle["URL"] = 5] = "URL";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
var TextInputStyle;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle = exports.TextInputStyle || (exports.TextInputStyle = {}));
var ApplicationCommandOptionType;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionType[ApplicationCommandOptionType["STRING"] = 3] = "STRING";
    ApplicationCommandOptionType[ApplicationCommandOptionType["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionType[ApplicationCommandOptionType["USER"] = 6] = "USER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionType[ApplicationCommandOptionType["ROLE"] = 8] = "ROLE";
    ApplicationCommandOptionType[ApplicationCommandOptionType["MENTIONABLE"] = 9] = "MENTIONABLE";
    ApplicationCommandOptionType[ApplicationCommandOptionType["NUMBER"] = 10] = "NUMBER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionType = exports.ApplicationCommandOptionType || (exports.ApplicationCommandOptionType = {}));
var ApplicationCommandType;
(function (ApplicationCommandType) {
    ApplicationCommandType[ApplicationCommandType["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    ApplicationCommandType[ApplicationCommandType["USER"] = 2] = "USER";
    ApplicationCommandType[ApplicationCommandType["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandType = exports.ApplicationCommandType || (exports.ApplicationCommandType = {}));
var AllowMentionType;
(function (AllowMentionType) {
    AllowMentionType["Role_Mentions"] = "roles";
    AllowMentionType["User_Mentions"] = "users";
    AllowMentionType["EveryoneMentions"] = "everyone";
})(AllowMentionType = exports.AllowMentionType || (exports.AllowMentionType = {}));
var PermissionFlags;
(function (PermissionFlags) {
    PermissionFlags[PermissionFlags["CREATE_INSTANT_INVITE"] = 1] = "CREATE_INSTANT_INVITE";
    PermissionFlags[PermissionFlags["KICK_MEMBERS"] = 2] = "KICK_MEMBERS";
    PermissionFlags[PermissionFlags["BAN_MEMBERS"] = 4] = "BAN_MEMBERS";
    PermissionFlags[PermissionFlags["ADMINISTRATOR"] = 8] = "ADMINISTRATOR";
    PermissionFlags[PermissionFlags["MANAGE_CHANNELS"] = 16] = "MANAGE_CHANNELS";
    PermissionFlags[PermissionFlags["MANAGE_GUILD"] = 32] = "MANAGE_GUILD";
    PermissionFlags[PermissionFlags["ADD_REACTIONS"] = 64] = "ADD_REACTIONS";
    PermissionFlags[PermissionFlags["VIEW_AUDIT_LOG"] = 128] = "VIEW_AUDIT_LOG";
    PermissionFlags[PermissionFlags["PRIORITY_SPEAKER"] = 256] = "PRIORITY_SPEAKER";
    PermissionFlags[PermissionFlags["STREAM"] = 512] = "STREAM";
    PermissionFlags[PermissionFlags["VIEW_CHANNEL"] = 1024] = "VIEW_CHANNEL";
    PermissionFlags[PermissionFlags["SEND_MESSAGES"] = 2048] = "SEND_MESSAGES";
    PermissionFlags[PermissionFlags["SEND_TTS_MESSAGES"] = 4096] = "SEND_TTS_MESSAGES";
    PermissionFlags[PermissionFlags["MANAGE_MESSAGES"] = 8192] = "MANAGE_MESSAGES";
    PermissionFlags[PermissionFlags["EMBED_LINKS"] = 16384] = "EMBED_LINKS";
    PermissionFlags[PermissionFlags["ATTACH_FILES"] = 32768] = "ATTACH_FILES";
    PermissionFlags[PermissionFlags["READ_MESSAGE_HISTORY"] = 65536] = "READ_MESSAGE_HISTORY";
    PermissionFlags[PermissionFlags["MENTION_EVERYONE"] = 131072] = "MENTION_EVERYONE";
    PermissionFlags[PermissionFlags["USE_EXTERNAL_EMOJIS"] = 262144] = "USE_EXTERNAL_EMOJIS";
    PermissionFlags[PermissionFlags["VIEW_GUILD_INSIGHTS"] = 524288] = "VIEW_GUILD_INSIGHTS";
    PermissionFlags[PermissionFlags["CONNECT"] = 1048576] = "CONNECT";
    PermissionFlags[PermissionFlags["SPEAK"] = 2097152] = "SPEAK";
    PermissionFlags[PermissionFlags["MUTE_MEMBERS"] = 4194304] = "MUTE_MEMBERS";
    PermissionFlags[PermissionFlags["DEAFEN_MEMBERS"] = 8388608] = "DEAFEN_MEMBERS";
    PermissionFlags[PermissionFlags["MOVE_MEMBERS"] = 16777216] = "MOVE_MEMBERS";
    PermissionFlags[PermissionFlags["USE_VAD"] = 33554432] = "USE_VAD";
    PermissionFlags[PermissionFlags["CHANGE_NICKNAME"] = 67108864] = "CHANGE_NICKNAME";
    PermissionFlags[PermissionFlags["MANAGE_NICKNAMES"] = 134217728] = "MANAGE_NICKNAMES";
    PermissionFlags[PermissionFlags["MANAGE_ROLES"] = 268435456] = "MANAGE_ROLES";
    PermissionFlags[PermissionFlags["MANAGE_WEBHOOKS"] = 536870912] = "MANAGE_WEBHOOKS";
    PermissionFlags[PermissionFlags["MANAGE_EMOJIS_AND_STICKERS"] = 1073741824] = "MANAGE_EMOJIS_AND_STICKERS";
    PermissionFlags[PermissionFlags["USE_APPLICATION_COMMANDS"] = -2147483648] = "USE_APPLICATION_COMMANDS";
    PermissionFlags[PermissionFlags["REQUEST_TO_SPEAK"] = 4294967296] = "REQUEST_TO_SPEAK";
    PermissionFlags[PermissionFlags["MANAGE_EVENTS"] = 8589934592] = "MANAGE_EVENTS";
    PermissionFlags[PermissionFlags["MANAGE_THREADS"] = 17179869184] = "MANAGE_THREADS";
    PermissionFlags[PermissionFlags["CREATE_PUBLIC_THREADS"] = 34359738368] = "CREATE_PUBLIC_THREADS";
    PermissionFlags[PermissionFlags["CREATE_PRIVATE_THREADS"] = 68719476736] = "CREATE_PRIVATE_THREADS";
    PermissionFlags[PermissionFlags["USE_EXTERNAL_STICKERS"] = 137438953472] = "USE_EXTERNAL_STICKERS";
    PermissionFlags[PermissionFlags["SEND_MESSAGES_IN_THREADS"] = 274877906944] = "SEND_MESSAGES_IN_THREADS";
    PermissionFlags[PermissionFlags["USE_EMBEDDED_ACTIVITIES"] = 549755813888] = "USE_EMBEDDED_ACTIVITIES";
    PermissionFlags[PermissionFlags["MODERATE_MEMBERS"] = 1099511627776] = "MODERATE_MEMBERS";
})(PermissionFlags = exports.PermissionFlags || (exports.PermissionFlags = {}));
var CommandPermissionsFlag;
(function (CommandPermissionsFlag) {
    CommandPermissionsFlag[CommandPermissionsFlag["OWNER"] = 1] = "OWNER";
    CommandPermissionsFlag[CommandPermissionsFlag["ADMINISTRATOR"] = 2] = "ADMINISTRATOR";
    CommandPermissionsFlag[CommandPermissionsFlag["BOT"] = 4] = "BOT";
    CommandPermissionsFlag[CommandPermissionsFlag["ROLE"] = 8] = "ROLE";
    CommandPermissionsFlag[CommandPermissionsFlag["MEMBER"] = 16] = "MEMBER";
    CommandPermissionsFlag[CommandPermissionsFlag["GROUP"] = 32] = "GROUP";
    CommandPermissionsFlag[CommandPermissionsFlag["USER"] = 64] = "USER";
})(CommandPermissionsFlag = exports.CommandPermissionsFlag || (exports.CommandPermissionsFlag = {}));
var WebhookType;
(function (WebhookType) {
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    WebhookType[WebhookType["Channel_Follower"] = 2] = "Channel_Follower";
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType = exports.WebhookType || (exports.WebhookType = {}));
