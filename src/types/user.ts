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

export enum ActivityTypes {
    Game, // Playing {name}
    Streaming, // Streaming {details}
    Listening, // Listening to {name}
    Watching, // Watching {name}
    Custom, // {emoji} {name}
    Competing, // Competing in {name}
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

export enum ActivityFlags {
    INSTANCE = 1 << 0,
    JOIN = 1 << 1,
    SPECTATE = 1 << 2,
    JOIN_REQUEST = 1 << 3,
    SYNC = 1 << 4,
    PLAY = 1 << 5,
    PARTY_PRIVACY_FRIENDS = 1 << 6,
    PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
    EMBEDDED = 1 << 8,
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

export enum UserFlags {
    STAFF = 1 << 0,
    PARTNER = 1 << 1,
    HYPESQUAD = 1 << 2,
    BUG_HUNTER_LEVEL_1 = 1 << 3,
    HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
    HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
    HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
    PREMIUM_EARLY_SUPPORTER = 1 << 9,
    TEAM_PSEUDO_USER = 1 << 10,
    BUG_HUNTER_LEVEL_2 = 1 << 14,
    VERIFIED_BOT = 1 << 16,
    VERIFIED_DEVELOPER = 1 << 17,
    CERTIFIED_MODERATOR = 1 << 18,
    BOT_HTTP_INTERACTIONS = 1 << 19,
}

export enum PremiumTypes {
    None, Classic, Nitro,
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