import { ChannelData, ChannelMentionData, LocaleOption, OverwriteData, ThreadMemberData, ThreadMetadataData, WebhookData, WelcomeScreenChannelData } from "../channel";

export function isChannel(obj: any): obj is ChannelData {
    let keys: (keyof ChannelData)[] = ["id", "type", "guild_id", "position", "permission_overwrites", "name", "topic", "nsfw", "last_message_id", "bitrate", "user_limit", "rate_limit_per_user", "recipients", "icon", "owner_id", "application_id", "parent_id", "last_pin_timestamp", "rtc_region", "video_quality_mode", "message_count", "member_count", "thread_metadata", "member", "default_auto_archive_duration", "permissions", "flags"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isWelcomeScreenChannel(obj: any): obj is WelcomeScreenChannelData {
    let keys: (keyof WelcomeScreenChannelData)[] = ["channel_id", "description", "emoji_id", "emoji_name"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isChannelMention(obj: any): obj is ChannelMentionData {
    let keys: (keyof ChannelMentionData)[] = ["id", "guild_id", "type", "name"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isThreadMetadata(obj: any): obj is ThreadMetadataData {
    let keys: (keyof ThreadMetadataData)[] = ["archived", "auto_archive_duration", "archive_timestamp", "locked", "invitable", "create_timestamp"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isThreadMember(obj: any): obj is ThreadMemberData {
    let keys: (keyof ThreadMemberData)[] = ["id", "user_id", "join_timestamp", "flags"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isOverwrite(obj: any): obj is OverwriteData {
    let keys: (keyof OverwriteData)[] = ["id", "type", "allow", "deny"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isLocaleOption(obj: any): obj is LocaleOption {
    let keys: LocaleOption[] = ["bg", "cs", "da", "de", "el", "en-GB", "en-US", "es-ES", "fi", "fr", "hi", "hr", "hu", "ja", "ko", "lt", "nl", "no", "pl", "pt-BR", "ro", "ru", "sv-SE", "th", "tr", "uk", "vi", "zh-CN", "zh-TW"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isWebhook(obj: any): obj is WebhookData {
    let keys: (keyof WebhookData)[] = ["id", "type", "guild_id", "channel_id", "user", "name", "avatar", "token", "application_id", "source_guild", "source_channel", "url"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}