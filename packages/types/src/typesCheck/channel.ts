import { ChannelData, ChannelMentionData, LocaleOption, OverwriteData, ThreadMemberData, ThreadMetadataData, WebhookData, WelcomeScreenChannelData } from '../channel';
import { isGuild } from './guild';
import { isBoolean, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeUndefined, isUnion } from './original';
import { isSnowflake } from './snowflake';
import { isTimestamp } from './timestamp';
import { isUser } from './user';

export function isChannel(obj: unknown): obj is ChannelData {
    return isTypeObject({
        id: isSnowflake,
        type: isNumber,
        guild_id: isTypeUndefined(isSnowflake),
        position: isTypeUndefined(isNumber),
        permission_overwrites: isTypeUndefined(isTypeArray(isOverwrite)),
        name: isTypeUndefined(isTypeNull(isString)),
        topic: isTypeUndefined(isTypeNull(isString)),
        nsfw: isTypeUndefined(isBoolean),
        last_message_id: isTypeUndefined(isTypeNull(isSnowflake)),
        bitrate: isTypeUndefined(isNumber),
        user_limit: isTypeUndefined(isNumber),
        rate_limit_per_user: isTypeUndefined(isNumber),
        recipients: isTypeUndefined(isTypeArray(isUser)),
        icon: isTypeUndefined(isTypeNull(isString)),
        owner_id: isTypeUndefined(isSnowflake),
        application_id: isTypeUndefined(isSnowflake),
        parent_id: isTypeUndefined(isTypeNull(isSnowflake)),
        last_pin_timestamp: isTypeUndefined(isTypeNull(isTimestamp)),
        rtc_region: isTypeUndefined(isTypeNull(isString)),
        video_quality_mode: isTypeUndefined(isNumber),
        message_count: isTypeUndefined(isNumber),
        member_count: isTypeUndefined(isNumber),
        thread_metadata: isTypeUndefined(isThreadMetadata),
        member: isTypeUndefined(isThreadMember),
        default_auto_archive_duration: isTypeUndefined(isNumber),
        permissions: isTypeUndefined(isString),
        flags: isTypeUndefined(isNumber)
    })(obj);
}

export function isWelcomeScreenChannel(obj: unknown): obj is WelcomeScreenChannelData {
    return isTypeObject({
        channel_id: isSnowflake,
        description: isString,
        emoji_id: isTypeNull(isSnowflake),
        emoji_name: isTypeNull(isString)
    })(obj);
}

export function isChannelMention(obj: unknown): obj is ChannelMentionData {
    return isTypeObject({
        id: isSnowflake,
        guild_id: isSnowflake,
        type: isNumber,
        name: isString
    })(obj);
}

export function isThreadMetadata(obj: unknown): obj is ThreadMetadataData {
    return isTypeObject({
        archived: isBoolean,
        auto_archive_duration: isNumber,
        archive_timestamp: isTimestamp,
        locked: isBoolean,
        invitable: isTypeUndefined(isBoolean),
        create_timestamp: isTypeUndefined(isTypeNull(isTimestamp))
    })(obj);
}

export function isThreadMember(obj: unknown): obj is ThreadMemberData {
    return isTypeObject({
        id: isTypeUndefined(isSnowflake),
        user_id: isTypeUndefined(isSnowflake),
        join_timestamp: isTimestamp,
        flags: isNumber
    })(obj);
}

export function isOverwrite(obj: unknown): obj is OverwriteData {
    return isTypeObject({
        id: isSnowflake,
        type: isNumber,
        allow: isString,
        deny: isString
    })(obj);
}

export function isLocaleOption(obj: unknown): obj is LocaleOption {
    return isUnion(isLiteral('da'), isLiteral('de'), isLiteral('en-GB'), isLiteral('en-US'), isLiteral('es-ES'), isLiteral('fr'), isLiteral('hr'), isLiteral('it'), isLiteral('lt'), isLiteral('hu'), isLiteral('nl'), isLiteral('no'), isLiteral('pl'), isLiteral('pt-BR'), isLiteral('ro'), isLiteral('fi'), isLiteral('sv-SE'), isLiteral('vi'), isLiteral('tr'), isLiteral('cs'), isLiteral('el'), isLiteral('bg'), isLiteral('ru'), isLiteral('uk'), isLiteral('hi'), isLiteral('th'), isLiteral('zh-CN'), isLiteral('ja'), isLiteral('zh-TW'), isLiteral('ko'))(obj);
}

export function isWebhook(obj: unknown): obj is WebhookData {
    return isTypeObject({
        id: isSnowflake,
        type: isNumber,
        guild_id: isTypeUndefined(isSnowflake),
        channel_id: isSnowflake,
        user: isTypeUndefined(isUser),
        name: isTypeNull(isString),
        avatar: isTypeNull(isString),
        token: isTypeUndefined(isString),
        application_id: isTypeNull(isSnowflake),
        source_guild: isTypeUndefined(isGuild),
        source_channel: isTypeUndefined(isChannel),
        url: isTypeUndefined(isString)
    })(obj);
}
