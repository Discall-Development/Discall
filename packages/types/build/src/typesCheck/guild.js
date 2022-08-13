"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoleTags = exports.isRole = exports.isInviteMetadata = exports.isInvite = exports.isAllowMentions = exports.isIntegrationApplication = exports.isIntegrationAccount = exports.isIntegration = exports.isWelcomeScreen = exports.isGuildMemberMention = exports.isGuildScheduledEventEntityMetadata = exports.isGuildScheduledEvent = exports.isGuildMember = exports.isGuidlFeature = exports.isUnavailableGuild = exports.isGuildPreview = exports.isGuild = void 0;
const user_1 = require("./user");
function isGuild(obj) {
    let keys = ["id", "name", "icon", "icon_hash", "splash", "discovery_splash", "owner", "owner_id", "permissions", "region", "afk_channel_id", "afk_timeout", "widget_enabled", "widget_channel_id", "verification_level", "default_message_notifications", "explicit_content_filter", "roles", "emojis", "features", "mfa_level", "application_id", "system_channel_id", "system_channel_flags", "rules_channel_id", "max_presences", "max_members", "vanity_url_code", "description", "banner", "premium_tier", "premium_subscription_count", "preferred_locale", "public_updates_channel_id", "max_video_channel_users", "approximate_member_count", "approximate_presence_count", "welcome_screen", "nsfw_level", "stickers", "premium_progress_bar_enabled"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isGuild = isGuild;
function isGuildPreview(obj) {
    let keys = ["id", "name", "icon", "splash", "discovery_splash", "emojis", "features", "approximate_member_count", "approximate_presence_count", "description", "stickers"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isGuildPreview = isGuildPreview;
function isUnavailableGuild(obj) {
    let keys = ["id", "unavailable"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isUnavailableGuild = isUnavailableGuild;
function isGuidlFeature(obj) {
    let keys = ["ANIMATED_BANNER", "ANIMATED_ICON", "BANNER", "COMMERCE", "COMMUNITY", "DISCOVERABLE", "FEATURABLE", "INVITE_SPLASH", "MEMBER_VERIFICATION_GATE_ENABLED", "MONETIZATION_ENABLED", "MORE_STICKERS", "NEWS", "PARTNERED", "PREVIEW_ENABLED", "PRIVATE_THREADS", "ROLE_ICONS", "TICKETED_EVENTS_ENABLED", "VANITY_URL", "VERIFIED", "VIP_REGIONS", "WELCOME_SCREEN_ENABLED"];
    return typeof obj === "string" && keys.includes(obj);
}
exports.isGuidlFeature = isGuidlFeature;
function isGuildMember(obj) {
    let keys = ["user", "nick", "avatar", "roles", "join_at", "premium_since", "deaf", "mute", "pending", "permission", "communication_disabled_until"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isGuildMember = isGuildMember;
function isGuildScheduledEvent(obj) {
    let keys = ["id", "guild_id", "channel_id", "creator_id", "name", "description", "scheduled_start_time", "scheduled_end_time", "privacy_level", "status", "entity_type", "entity_id", "entity_metadata", "creator", "user_count", "image"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isGuildScheduledEvent = isGuildScheduledEvent;
function isGuildScheduledEventEntityMetadata(obj) {
    let keys = ["location"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isGuildScheduledEventEntityMetadata = isGuildScheduledEventEntityMetadata;
function isGuildMemberMention(obj) {
    let keys = ["member"];
    let result = Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
    keys.forEach(v => delete obj[v]);
    return result && (0, user_1.isUser)(obj);
}
exports.isGuildMemberMention = isGuildMemberMention;
function isWelcomeScreen(obj) {
    let keys = ["description", "welcome_channels"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isWelcomeScreen = isWelcomeScreen;
function isIntegration(obj) {
    let keys = ["id", "name", "type", "enabled", "syncing", "role_id", "enable_emoticons", "expire_behavior", "expire_grace_period", "user", "account", "synced", "subscriber_count", "revoked", "application"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIntegration = isIntegration;
function isIntegrationAccount(obj) {
    let keys = ["id", "name"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIntegrationAccount = isIntegrationAccount;
function isIntegrationApplication(obj) {
    let keys = ["id", "name", "icon", "description", "bot"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIntegrationApplication = isIntegrationApplication;
function isAllowMentions(obj) {
    let keys = ["parse", "roles", "users", "replied_user"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isAllowMentions = isAllowMentions;
function isInvite(obj) {
    let keys = ["code", "guild", "channel", "inviter", "target_type", "target_user", "target_application", "approximate_presence_count", "approximate_member_count", "expires_at", "guild_scheduled_event"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isInvite = isInvite;
function isInviteMetadata(obj) {
    let keys = ["uses", "max_uses", "max_age", "temporary", "created_at"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isInviteMetadata = isInviteMetadata;
function isRole(obj) {
    let keys = ["id", "name", "color", "hoist", "icon", "unicode_emoji", "position", "permissions", "managed", "mentionable", "tags"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isRole = isRole;
function isRoleTags(obj) {
    let keys = ["bot_id", "integration_id", "premium_subscriber"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isRoleTags = isRoleTags;
