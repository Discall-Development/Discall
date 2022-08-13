import { AllowMentionsData, GuildData, GuildFeature, GuildMemberData, GuildMemberMentionData, GuildPreviewData, GuildScheduledEventData, GuildScheduledEventEntityMetadata, IntegrationAccountData, IntegrationApplicationData, IntegrationData, InviteData, InviteMetadata, RoleData, RoleTagsData, UnavailableGuildData, WelcomeScreenData } from "../guild";
import { isUser } from "./user";

export function isGuild(obj: any): obj is GuildData {
    let keys: (keyof GuildData)[] = ["id", "name", "icon", "icon_hash", "splash", "discovery_splash", "owner", "owner_id", "permissions", "region", "afk_channel_id", "afk_timeout", "widget_enabled", "widget_channel_id", "verification_level", "default_message_notifications", "explicit_content_filter", "roles", "emojis", "features", "mfa_level", "application_id", "system_channel_id", "system_channel_flags", "rules_channel_id", "max_presences", "max_members", "vanity_url_code", "description", "banner", "premium_tier", "premium_subscription_count", "preferred_locale", "public_updates_channel_id", "max_video_channel_users", "approximate_member_count", "approximate_presence_count", "welcome_screen", "nsfw_level", "stickers", "premium_progress_bar_enabled"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isGuildPreview(obj: any): obj is GuildPreviewData {
    let keys: (keyof GuildPreviewData)[] = ["id", "name", "icon", "splash", "discovery_splash", "emojis", "features", "approximate_member_count", "approximate_presence_count", "description", "stickers"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isUnavailableGuild(obj: any): obj is UnavailableGuildData {
    let keys: (keyof UnavailableGuildData)[] = ["id", "unavailable"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isGuidlFeature(obj: any): obj is GuildFeature {
    let keys: GuildFeature[] = ["ANIMATED_BANNER", "ANIMATED_ICON", "BANNER", "COMMERCE", "COMMUNITY", "DISCOVERABLE", "FEATURABLE", "INVITE_SPLASH", "MEMBER_VERIFICATION_GATE_ENABLED", "MONETIZATION_ENABLED", "MORE_STICKERS", "NEWS", "PARTNERED", "PREVIEW_ENABLED", "PRIVATE_THREADS", "ROLE_ICONS", "TICKETED_EVENTS_ENABLED", "VANITY_URL", "VERIFIED", "VIP_REGIONS", "WELCOME_SCREEN_ENABLED"];
    return typeof obj === "string" && keys.includes(obj as GuildFeature);
}

export function isGuildMember(obj: any): obj is GuildMemberData {
    let keys: (keyof GuildMemberData)[] = ["user", "nick", "avatar", "roles", "join_at", "premium_since", "deaf", "mute", "pending", "permission", "communication_disabled_until"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isGuildScheduledEvent(obj: any): obj is GuildScheduledEventData {
    let keys: (keyof GuildScheduledEventData)[] = ["id", "guild_id", "channel_id", "creator_id", "name", "description", "scheduled_start_time", "scheduled_end_time", "privacy_level", "status", "entity_type", "entity_id", "entity_metadata", "creator", "user_count", "image"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isGuildScheduledEventEntityMetadata(obj: any): obj is GuildScheduledEventEntityMetadata {
    let keys: (keyof GuildScheduledEventEntityMetadata)[] = ["location"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isGuildMemberMention(obj: any): obj is GuildMemberMentionData {
    let keys: (keyof GuildMemberMentionData)[] = ["member"];
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    
    keys.forEach(v => delete obj[v]);
    return result && isUser(obj);
}

export function isWelcomeScreen(obj: any): obj is WelcomeScreenData {
    let keys: (keyof WelcomeScreenData)[] = ["description", "welcome_channels"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isIntegration(obj: any): obj is IntegrationData {
    let keys: (keyof IntegrationData)[] = ["id", "name", "type", "enabled", "syncing", "role_id", "enable_emoticons", "expire_behavior", "expire_grace_period", "user", "account", "synced", "subscriber_count", "revoked", "application"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isIntegrationAccount(obj: any): obj is IntegrationAccountData {
    let keys: (keyof IntegrationAccountData)[] = ["id", "name"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isIntegrationApplication(obj: any): obj is IntegrationApplicationData {
    let keys: (keyof IntegrationApplicationData)[] = ["id", "name", "icon", "description", "bot"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isAllowMentions(obj: any): obj is AllowMentionsData {
    let keys: (keyof AllowMentionsData)[] = ["parse", "roles", "users", "replied_user"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isInvite(obj: any): obj is InviteData {
    let keys: (keyof InviteData)[] = ["code", "guild", "channel", "inviter", "target_type", "target_user", "target_application", "approximate_presence_count", "approximate_member_count", "expires_at", "guild_scheduled_event"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isInviteMetadata(obj: any): obj is InviteMetadata {
    let keys: (keyof InviteMetadata)[] = ["uses", "max_uses", "max_age", "temporary", "created_at"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isRole(obj: any): obj is RoleData {
    let keys: (keyof RoleData)[] = ["id", "name", "color", "hoist", "icon", "unicode_emoji", "position", "permissions", "managed", "mentionable", "tags"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isRoleTags(obj: any): obj is RoleTagsData {
    let keys: (keyof RoleTagsData)[] = ["bot_id", "integration_id", "premium_subscriber"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}