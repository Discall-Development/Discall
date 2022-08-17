import { AllowMentionsData, GuildData, GuildFeature, GuildMemberData, GuildMemberMentionData, GuildPreviewData, GuildScheduledEventData, GuildScheduledEventEntityMetadata, ImageScheme, IntegrationAccountData, IntegrationApplicationData, IntegrationData, InviteData, InviteMetadata, RoleData, RoleTagsData, UnavailableGuildData, WelcomeScreenData } from '../guild';
import { isApplication } from './application';
import { isChannel, isWelcomeScreenChannel } from './channel';
import { isEmoji, isSticker } from './message';
import { isBoolean, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeUndefined, isUnion } from './original';
import { isSnowflake } from './snowflake';
import { isTimestamp } from './timestamp';
import { isUser } from './user';

export function isGuild(obj: unknown): obj is GuildData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        icon: isTypeNull(isString),
        icon_hash: isTypeUndefined(isTypeNull(isString)),
        splash: isTypeNull(isString),
        discovery_splash: isTypeNull(isString),
        owner: isTypeUndefined(isBoolean),
        owner_id: isSnowflake,
        permissions: isTypeUndefined(isString),
        region: isTypeUndefined(isTypeNull(isString)),
        afk_channel_id: isTypeNull(isSnowflake),
        afk_timeout: isNumber,
        widget_enabled: isTypeUndefined(isBoolean),
        widget_channel_id: isTypeUndefined(isTypeNull(isSnowflake)),
        verification_level: isNumber,
        default_message_notifications: isNumber,
        explicit_content_filter: isNumber,
        roles: isTypeArray(isRole),
        emojis: isTypeArray(isEmoji),
        features: isTypeArray(isGuildFeature),
        mfa_level: isNumber,
        application_id: isTypeNull(isSnowflake),
        system_channel_id: isTypeNull(isSnowflake),
        system_channel_flags: isNumber,
        rules_channel_id: isTypeNull(isSnowflake),
        max_presences: isTypeUndefined(isTypeNull(isNumber)),
        max_members: isTypeUndefined(isNumber),
        vanity_url_code: isTypeNull(isString),
        description: isTypeNull(isString),
        banner: isTypeNull(isString),
        premium_tier: isNumber,
        premium_subscription_count: isTypeUndefined(isNumber),
        preferred_locale: isString,
        public_updates_channel_id: isTypeNull(isSnowflake),
        max_video_channel_users: isTypeUndefined(isNumber),
        approximate_member_count: isNumber,
        approximate_presence_count: isNumber,
        welcome_screen: isTypeUndefined(isWelcomeScreen),
        nsfw_level: isNumber,
        stickers: isTypeArray(isSticker),
        premium_progress_bar_enabled: isBoolean,
    })(obj);
}

export function isGuildPreview(obj: unknown): obj is GuildPreviewData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        icon: isTypeNull(isString),
        splash: isTypeNull(isString),
        discovery_splash: isTypeNull(isString),
        emojis: isTypeArray(isEmoji),
        features: isTypeArray(isGuildFeature),
        approximate_member_count: isNumber,
        approximate_presence_count: isNumber,
        description: isTypeNull(isString),
        stickers: isTypeArray(isSticker)
    })(obj);
}

export function isUnavailableGuild(obj: unknown): obj is UnavailableGuildData {
    return isTypeObject({
        id: isSnowflake,
        unavailable: isTypeUndefined(isBoolean)
    })(obj);
}

export function isGuildFeature(obj: unknown): obj is GuildFeature {
    return isUnion(isLiteral('ANIMATED_BANNER'), isLiteral('ANIMATED_ICON'), isLiteral('BANNER'), isLiteral('COMMERCE'), isLiteral('COMMUNITY'), isLiteral('DISCOVERABLE'), isLiteral('FEATURABLE'), isLiteral('INVITE_SPLASH'), isLiteral('MEMBER_VERIFICATION_GATE_ENABLED'), isLiteral('MONETIZATION_ENABLED'), isLiteral('MORE_STICKERS'), isLiteral('NEWS'), isLiteral('PARTNERED'), isLiteral('PREVIEW_ENABLED'), isLiteral('PRIVATE_THREADS'), isLiteral('ROLE_ICONS'), isLiteral('TICKETED_EVENTS_ENABLED'), isLiteral('VANITY_URL'), isLiteral('VERIFIED'), isLiteral('VIP_REGIONS'), isLiteral('WELCOME_SCREEN_ENABLED'))(obj);
}

export function isGuildMember(obj: unknown): obj is GuildMemberData {
    return isTypeObject({
        user: isTypeUndefined(isUser),
        nick: isTypeUndefined(isTypeNull(isString)),
        avatar: isTypeUndefined(isTypeNull(isString)),
        roles: isTypeArray(isSnowflake),
        join_at: isTimestamp,
        premium_since: isTypeUndefined(isTypeNull(isTimestamp)),
        deaf: isBoolean,
        mute: isBoolean,
        pending: isTypeUndefined(isBoolean),
        permission: isTypeUndefined(isString),
        communication_disabled_until: isTypeUndefined(isTypeNull(isTimestamp)),
    })(obj);
}

export function isGuildScheduledEvent(obj: unknown): obj is GuildScheduledEventData {
    return isTypeObject({
        id: isSnowflake,
        guild_id: isSnowflake,
        channel_id: isTypeNull(isSnowflake),
        creator_id: isTypeUndefined(isTypeNull(isSnowflake)),
        name: isString,
        description: isTypeUndefined(isTypeNull(isString)),
        scheduled_start_time: isTimestamp,
        scheduled_end_time: isTypeNull(isTimestamp),
        privacy_level: isNumber,
        status: isNumber,
        entity_type: isNumber,
        entity_id: isTypeNull(isSnowflake),
        entity_metadata: isGuildScheduledEventEntityMetadata,
        creator: isTypeUndefined(isUser),
        user_count: isTypeUndefined(isNumber),
        image: isTypeUndefined(isTypeNull(isString))
    })(obj);
}

export function isGuildScheduledEventEntityMetadata(obj: unknown): obj is GuildScheduledEventEntityMetadata {
    return isTypeObject({
        location: isTypeUndefined(isString)
    })(obj);
}

export function isGuildMemberMention(obj: unknown): obj is GuildMemberMentionData {
    return isUser(obj) && isTypeObject({
        member: isGuildMember
    })(obj);
}

export function isWelcomeScreen(obj: unknown): obj is WelcomeScreenData {
    return isTypeObject({
        description: isTypeNull(isString),
        welcome_channels: isTypeArray(isWelcomeScreenChannel)
    })(obj);
}

export function isIntegration(obj: unknown): obj is IntegrationData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        type: isString,
        enabled: isTypeUndefined(isBoolean),
        syncing: isTypeUndefined(isBoolean),
        role_id: isTypeUndefined(isSnowflake),
        enable_emoticons: isTypeUndefined(isBoolean),
        expire_behavior: isTypeUndefined(isNumber),
        expire_grace_period: isTypeUndefined(isNumber),
        user: isTypeUndefined(isUser),
        account: isIntegrationAccount,
        synced_at: isTypeUndefined(isTimestamp),
        subscriber_count: isTypeUndefined(isNumber),
        revoked: isTypeUndefined(isBoolean),
        application: isTypeUndefined(isIntegrationApplication),
    })(obj);
}

export function isIntegrationAccount(obj: unknown): obj is IntegrationAccountData {
    return isTypeObject({
        id: isString,
        name: isString
    })(obj);
}

export function isIntegrationApplication(obj: unknown): obj is IntegrationApplicationData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        icon: isTypeNull(isString),
        description: isString,
        bot: isTypeUndefined(isUser)
    })(obj);
}

export function isAllowMentions(obj: unknown): obj is AllowMentionsData {
    return isTypeObject({
        parse: isTypeArray(isString),
        roles: isTypeArray(isSnowflake),
        users: isTypeArray(isSnowflake),
        replied_user: isBoolean
    })(obj);
}

export function isInvite(obj: unknown): obj is InviteData {
    return isTypeObject({
        code: isString,
        guild: isTypeUndefined(isGuild),
        channel: isTypeNull(isChannel),
        inviter: isTypeUndefined(isUser),
        target_type: isNumber,
        target_user: isTypeUndefined(isUser),
        target_application: isTypeUndefined(isApplication),
        approximate_presence_count: isTypeUndefined(isNumber),
        approximate_member_count: isTypeUndefined(isNumber),
        expires_at: isTypeUndefined(isTypeNull(isTimestamp)),
        guild_scheduled_event: isTypeUndefined(isGuildScheduledEvent)
    })(obj);
}

export function isInviteMetadata(obj: unknown): obj is InviteMetadata {
    return isTypeObject({
        uses: isNumber,
        max_uses: isNumber,
        max_age: isNumber,
        temporary: isBoolean,
        created_at: isTimestamp
    })(obj);
}

export function isRole(obj: unknown): obj is RoleData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        color: isNumber,
        hoist: isBoolean,
        icon: isTypeUndefined(isTypeNull(isString)),
        unicode_emoji: isTypeUndefined(isTypeNull(isString)),
        position: isNumber,
        permissions: isString,
        managed: isBoolean,
        mentionable: isBoolean,
        tags: isTypeUndefined(isRoleTags)
    })(obj);
}

export function isRoleTags(obj: unknown): obj is RoleTagsData {
    return isTypeObject({
        bot_id: isTypeUndefined(isSnowflake),
        integration_id: isTypeUndefined(isSnowflake),
        premium_subsciber: isTypeUndefined(isLiteral(null))
    })(obj);
}

export function isImageScheme(obj: unknown): obj is ImageScheme {
    return typeof obj === 'string' &&
        obj.startsWith('data:') &&
        obj.replace('data:', '').split(';')
            .every((v, idx) => {
                switch(idx) {
                case 0:
                    return ['image/jpeg', 'image/png', 'image/gif'].includes(v);
                case 1:
                    return v.startsWith('base64');
                }
            });
}