import { LocaleOption } from "./channel";
import { SnowflakeData } from "./snowflake";
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
export declare enum ActivityTypes {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
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
export declare enum ActivityFlags {
    INSTANCE = 1,
    JOIN = 2,
    SPECTATE = 4,
    JOIN_REQUEST = 8,
    SYNC = 16,
    PLAY = 32,
    PARTY_PRIVACY_FRIENDS = 64,
    PARTY_PRIVACY_VOICE_CHANNEL = 128,
    EMBEDDED = 256
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
export declare enum UserFlags {
    STAFF = 1,
    PARTNER = 2,
    HYPESQUAD = 4,
    BUG_HUNTER_LEVEL_1 = 8,
    HYPESQUAD_ONLINE_HOUSE_1 = 64,
    HYPESQUAD_ONLINE_HOUSE_2 = 128,
    HYPESQUAD_ONLINE_HOUSE_3 = 256,
    PREMIUM_EARLY_SUPPORTER = 512,
    TEAM_PSEUDO_USER = 1024,
    BUG_HUNTER_LEVEL_2 = 16384,
    VERIFIED_BOT = 65536,
    VERIFIED_DEVELOPER = 131072,
    CERTIFIED_MODERATOR = 262144,
    BOT_HTTP_INTERACTIONS = 524288
}
export declare enum PremiumTypes {
    None = 0,
    Classic = 1,
    Nitro = 2
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
export interface PresenceUpdateData {
    user: UserData;
    guild_id: SnowflakeData;
    status: string;
    activities: ActivityData[];
    client_status: ClientStatusData;
}
