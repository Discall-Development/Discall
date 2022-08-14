"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoleTags = exports.isRole = exports.isInviteMetadata = exports.isInvite = exports.isAllowMentions = exports.isIntegrationApplication = exports.isIntegrationAccount = exports.isIntegration = exports.isWelcomeScreen = exports.isGuildMemberMention = exports.isGuildScheduledEventEntityMetadata = exports.isGuildScheduledEvent = exports.isGuildMember = exports.isGuildFeature = exports.isUnavailableGuild = exports.isGuildPreview = exports.isGuild = void 0;
const application_1 = require("./application");
const channel_1 = require("./channel");
const message_1 = require("./message");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
const timestamp_1 = require("./timestamp");
const user_1 = require("./user");
function isGuild(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        icon: (0, original_1.isTypeNull)(original_1.isString),
        icon_hash: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        splash: (0, original_1.isTypeNull)(original_1.isString),
        discovery_splash: (0, original_1.isTypeNull)(original_1.isString),
        owner: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        owner_id: snowflake_1.isSnowflake,
        permissions: (0, original_1.isTypeUndefined)(original_1.isString),
        region: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        afk_channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        afk_timeout: original_1.isNumber,
        widget_enabled: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        widget_channel_id: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(snowflake_1.isSnowflake)),
        verification_level: original_1.isNumber,
        default_message_notifications: original_1.isNumber,
        explicit_content_filter: original_1.isNumber,
        roles: (0, original_1.isTypeArray)(isRole),
        emojis: (0, original_1.isTypeArray)(message_1.isEmoji),
        features: (0, original_1.isTypeArray)(isGuildFeature),
        mfa_level: original_1.isNumber,
        application_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        system_channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        system_channel_flags: original_1.isNumber,
        rules_channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        max_presences: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isNumber)),
        max_members: (0, original_1.isTypeUndefined)(original_1.isNumber),
        vanity_url_code: (0, original_1.isTypeNull)(original_1.isString),
        description: (0, original_1.isTypeNull)(original_1.isString),
        banner: (0, original_1.isTypeNull)(original_1.isString),
        premium_tier: original_1.isNumber,
        premium_subscription_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        preferred_locale: original_1.isString,
        public_updates_channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        max_video_channel_users: (0, original_1.isTypeUndefined)(original_1.isNumber),
        approximate_member_count: original_1.isNumber,
        approximate_presence_count: original_1.isNumber,
        welcome_screen: (0, original_1.isTypeUndefined)(isWelcomeScreen),
        nsfw_level: original_1.isNumber,
        stickers: (0, original_1.isTypeArray)(message_1.isSticker),
        premium_progress_bar_enabled: original_1.isBoolean,
    })(obj);
}
exports.isGuild = isGuild;
function isGuildPreview(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        icon: (0, original_1.isTypeNull)(original_1.isString),
        splash: (0, original_1.isTypeNull)(original_1.isString),
        discovery_splash: (0, original_1.isTypeNull)(original_1.isString),
        emojis: (0, original_1.isTypeArray)(message_1.isEmoji),
        features: (0, original_1.isTypeArray)(isGuildFeature),
        approximate_member_count: original_1.isNumber,
        approximate_presence_count: original_1.isNumber,
        description: (0, original_1.isTypeNull)(original_1.isString),
        stickers: (0, original_1.isTypeArray)(message_1.isSticker)
    })(obj);
}
exports.isGuildPreview = isGuildPreview;
function isUnavailableGuild(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        unavailable: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isUnavailableGuild = isUnavailableGuild;
function isGuildFeature(obj) {
    return (0, original_1.isUnion)((0, original_1.isLiteral)('ANIMATED_BANNER'), (0, original_1.isLiteral)('ANIMATED_ICON'), (0, original_1.isLiteral)('BANNER'), (0, original_1.isLiteral)('COMMERCE'), (0, original_1.isLiteral)('COMMUNITY'), (0, original_1.isLiteral)('DISCOVERABLE'), (0, original_1.isLiteral)('FEATURABLE'), (0, original_1.isLiteral)('INVITE_SPLASH'), (0, original_1.isLiteral)('MEMBER_VERIFICATION_GATE_ENABLED'), (0, original_1.isLiteral)('MONETIZATION_ENABLED'), (0, original_1.isLiteral)('MORE_STICKERS'), (0, original_1.isLiteral)('NEWS'), (0, original_1.isLiteral)('PARTNERED'), (0, original_1.isLiteral)('PREVIEW_ENABLED'), (0, original_1.isLiteral)('PRIVATE_THREADS'), (0, original_1.isLiteral)('ROLE_ICONS'), (0, original_1.isLiteral)('TICKETED_EVENTS_ENABLED'), (0, original_1.isLiteral)('VANITY_URL'), (0, original_1.isLiteral)('VERIFIED'), (0, original_1.isLiteral)('VIP_REGIONS'), (0, original_1.isLiteral)('WELCOME_SCREEN_ENABLED'))(obj);
}
exports.isGuildFeature = isGuildFeature;
function isGuildMember(obj) {
    return (0, original_1.isTypeObject)({
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        nick: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        avatar: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        roles: (0, original_1.isTypeArray)(snowflake_1.isSnowflake),
        join_at: timestamp_1.isTimestamp,
        premium_since: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(timestamp_1.isTimestamp)),
        deaf: original_1.isBoolean,
        mute: original_1.isBoolean,
        pending: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        permission: (0, original_1.isTypeUndefined)(original_1.isString),
        communication_disabled_until: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(timestamp_1.isTimestamp)),
    })(obj);
}
exports.isGuildMember = isGuildMember;
function isGuildScheduledEvent(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        guild_id: snowflake_1.isSnowflake,
        channel_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        creator_id: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(snowflake_1.isSnowflake)),
        name: original_1.isString,
        description: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        scheduled_start_time: timestamp_1.isTimestamp,
        scheduled_end_time: (0, original_1.isTypeNull)(timestamp_1.isTimestamp),
        privacy_level: original_1.isNumber,
        status: original_1.isNumber,
        entity_type: original_1.isNumber,
        entity_id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        entity_metadata: isGuildScheduledEventEntityMetadata,
        creator: (0, original_1.isTypeUndefined)(user_1.isUser),
        user_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        image: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString))
    })(obj);
}
exports.isGuildScheduledEvent = isGuildScheduledEvent;
function isGuildScheduledEventEntityMetadata(obj) {
    return (0, original_1.isTypeObject)({
        location: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isGuildScheduledEventEntityMetadata = isGuildScheduledEventEntityMetadata;
function isGuildMemberMention(obj) {
    return (0, user_1.isUser)(obj) && (0, original_1.isTypeObject)({
        member: isGuildMember
    })(obj);
}
exports.isGuildMemberMention = isGuildMemberMention;
function isWelcomeScreen(obj) {
    return (0, original_1.isTypeObject)({
        description: (0, original_1.isTypeNull)(original_1.isString),
        welcome_channels: (0, original_1.isTypeArray)(channel_1.isWelcomeScreenChannel)
    })(obj);
}
exports.isWelcomeScreen = isWelcomeScreen;
function isIntegration(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        type: original_1.isString,
        enabled: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        syncing: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        role_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        enable_emoticons: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        expire_behavior: (0, original_1.isTypeUndefined)(original_1.isNumber),
        expire_grace_period: (0, original_1.isTypeUndefined)(original_1.isNumber),
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        account: isIntegrationAccount,
        synced_at: (0, original_1.isTypeUndefined)(timestamp_1.isTimestamp),
        subscriber_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        revoked: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        application: (0, original_1.isTypeUndefined)(isIntegrationApplication),
    })(obj);
}
exports.isIntegration = isIntegration;
function isIntegrationAccount(obj) {
    return (0, original_1.isTypeObject)({
        id: original_1.isString,
        name: original_1.isString
    })(obj);
}
exports.isIntegrationAccount = isIntegrationAccount;
function isIntegrationApplication(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        icon: (0, original_1.isTypeNull)(original_1.isString),
        description: original_1.isString,
        bot: (0, original_1.isTypeUndefined)(user_1.isUser)
    })(obj);
}
exports.isIntegrationApplication = isIntegrationApplication;
function isAllowMentions(obj) {
    return (0, original_1.isTypeObject)({
        parse: (0, original_1.isTypeArray)(original_1.isString),
        roles: (0, original_1.isTypeArray)(snowflake_1.isSnowflake),
        users: (0, original_1.isTypeArray)(snowflake_1.isSnowflake),
        replied_user: original_1.isBoolean
    })(obj);
}
exports.isAllowMentions = isAllowMentions;
function isInvite(obj) {
    return (0, original_1.isTypeObject)({
        code: original_1.isString,
        guild: (0, original_1.isTypeUndefined)(isGuild),
        channel: (0, original_1.isTypeNull)(channel_1.isChannel),
        inviter: (0, original_1.isTypeUndefined)(user_1.isUser),
        target_type: original_1.isNumber,
        target_user: (0, original_1.isTypeUndefined)(user_1.isUser),
        target_application: (0, original_1.isTypeUndefined)(application_1.isApplication),
        approximate_presence_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        approximate_member_count: (0, original_1.isTypeUndefined)(original_1.isNumber),
        expires_at: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(timestamp_1.isTimestamp)),
        guild_scheduled_event: (0, original_1.isTypeUndefined)(isGuildScheduledEvent)
    })(obj);
}
exports.isInvite = isInvite;
function isInviteMetadata(obj) {
    return (0, original_1.isTypeObject)({
        uses: original_1.isNumber,
        max_uses: original_1.isNumber,
        max_age: original_1.isNumber,
        temporary: original_1.isBoolean,
        created_at: timestamp_1.isTimestamp
    })(obj);
}
exports.isInviteMetadata = isInviteMetadata;
function isRole(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        color: original_1.isNumber,
        hoist: original_1.isBoolean,
        icon: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        unicode_emoji: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        position: original_1.isNumber,
        permissions: original_1.isString,
        managed: original_1.isBoolean,
        mentionable: original_1.isBoolean,
        tags: (0, original_1.isTypeUndefined)(isRoleTags)
    })(obj);
}
exports.isRole = isRole;
function isRoleTags(obj) {
    return (0, original_1.isTypeObject)({
        bot_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        integration_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        premium_subsciber: (0, original_1.isTypeUndefined)((0, original_1.isLiteral)(null))
    })(obj);
}
exports.isRoleTags = isRoleTags;
