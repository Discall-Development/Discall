import { ActivityAssets, ActivityButtons, ActivityData, ActivityEmoji, ActivityParty, ActivitySecrets, ActivityTimestamps, ClientStatusData, PresenceUpdateData, UserData } from "../types/user";

export function isActivity(obj: any): obj is ActivityData {
    let keys: (keyof ActivityData)[] = ["name", "type", "url", "created_at", "timestamps", "application_id", "details", "state", "emoji", "party", "assets", "secrets", "instance", "flags", "buttons"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivityTimestamp(obj: any): obj is ActivityTimestamps {
    let keys: (keyof ActivityTimestamps)[] = ["start", "end"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivityEmoji(obj: any): obj is ActivityEmoji {
    let keys: (keyof ActivityEmoji)[] = ["name", "id", "animated"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivityParty(obj: any): obj is ActivityParty {
    let keys: (keyof ActivityParty)[] = ["id", "size"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivityAssets(obj: any): obj is ActivityAssets {
    let keys: (keyof ActivityAssets)[] = ["large_image", "large_text", "small_image", "small_text"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivitySecrets(obj: any): obj is ActivitySecrets {
    let keys: (keyof ActivitySecrets)[] = ["join", "spectate", "match"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActivityButtons(obj: any): obj is ActivityButtons {
    let keys: (keyof ActivityButtons)[] = ["label", "url"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isClientStatus(obj: any): obj is ClientStatusData {
    let keys: (keyof ClientStatusData)[] = ["desktop", "mobile", "web"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isUser(obj: any): obj is UserData {
    let keys: (keyof UserData)[] = ["id", "username", "discriminator", "avatar", "bot", "system", "mfa_enabled", "banner", "accent_color", "locale", "verified", "email", "flags", "premium_type", "public_flags"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isPresenceUpdate(obj: any): obj is PresenceUpdateData {
    let keys: (keyof PresenceUpdateData)[] = ["user", "guild_id", "status", "activities", "client_status"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}