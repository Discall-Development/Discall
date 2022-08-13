"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteTargetType = exports.PermissionFlags = exports.AllowMentionType = exports.IntegrationExpireBehaviors = exports.PremiumTier = exports.MFALevel = exports.ExplicitContentFilterLevel = exports.VerificationLevel = exports.GuildScheduledEventEntityType = exports.GuildScheduledEventStatus = exports.GuildScheduledEventPrivacyLevel = exports.GuildNSFWLevel = void 0;
var GuildNSFWLevel;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFWLevel[GuildNSFWLevel["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFWLevel[GuildNSFWLevel["SAFE"] = 2] = "SAFE";
    GuildNSFWLevel[GuildNSFWLevel["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevel = exports.GuildNSFWLevel || (exports.GuildNSFWLevel = {}));
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
var VerificationLevel;
(function (VerificationLevel) {
    VerificationLevel[VerificationLevel["NONE"] = 0] = "NONE";
    VerificationLevel[VerificationLevel["LOW"] = 1] = "LOW";
    VerificationLevel[VerificationLevel["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevel[VerificationLevel["HIGH"] = 3] = "HIGH";
    VerificationLevel[VerificationLevel["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevel = exports.VerificationLevel || (exports.VerificationLevel = {}));
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
var PremiumTier;
(function (PremiumTier) {
    PremiumTier[PremiumTier["NONE"] = 0] = "NONE";
    PremiumTier[PremiumTier["TIER_1"] = 1] = "TIER_1";
    PremiumTier[PremiumTier["TIER_2"] = 2] = "TIER_2";
    PremiumTier[PremiumTier["TIER_3"] = 3] = "TIER_3";
})(PremiumTier = exports.PremiumTier || (exports.PremiumTier = {}));
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["RemoveRole"] = 0] = "RemoveRole";
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["Kick"] = 1] = "Kick";
})(IntegrationExpireBehaviors = exports.IntegrationExpireBehaviors || (exports.IntegrationExpireBehaviors = {}));
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
var InviteTargetType;
(function (InviteTargetType) {
    InviteTargetType[InviteTargetType["STREAM"] = 1] = "STREAM";
    InviteTargetType[InviteTargetType["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
})(InviteTargetType = exports.InviteTargetType || (exports.InviteTargetType = {}));
