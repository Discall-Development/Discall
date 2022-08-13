import { SnowflakeData } from "./snowflake";
export declare enum ApplicationFlag {
    GATEWAY_PRESENCE = 4096,
    GATEWAY_PRESENCE_LIMITED = 8192,
    GATEWAY_GUILD_MEMBERS = 16384,
    GATEWAY_GUILD_MEMBERS_LIMITED = 32768,
    VERIFICATION_PENDING_GUILD_LIMIT = 65536,
    EMBEDDED = 131072,
    GATEWAY_MESSAGE_CONTENT = 262144,
    GATEWAY_MESSAGE_CONTENT_LIMITED = 524288
}
export interface ApplicationCommandPermissionsData {
    id: SnowflakeData;
    type: ApplicationCommandPermissionsType;
    permission: boolean;
}
export declare enum ApplicationCommandPermissionsType {
    ROLE = 1,
    USER = 2,
    CHANNEL = 3
}
export interface ApplicationData {
    id: SnowflakeData;
    name: string;
    icon: string | null;
    flags: ApplicationFlag;
}
