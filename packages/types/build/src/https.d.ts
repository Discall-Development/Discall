import { SnowflakeData } from './snowflake';
export declare enum HttpMode {
    GET = 0,
    DELETE = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4
}
export interface HttpRequest {
    uri: (base: URL) => {
        uri: string;
        mode: HttpMode;
    };
    data?: unknown;
    cache?: (() => unknown) | ((data: unknown) => void);
    reason?: string;
}
export interface HttpRequestData {
    type: string;
    data: HttpRequestData | IdData | Record<string, unknown> | Record<string, never>;
}
export interface IdData {
    guild_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    message_id?: SnowflakeData;
    moderation_id?: SnowflakeData;
    data: HttpRequestData;
}
export declare enum HttpUri {
    'create+id+channel+message' = "/channels/{channel_id}/messages",
    'get+id+guild+audit' = "/guilds/{guild_id}/audit-logs{query}",
    'get+id+guild+moderation' = "/guilds/{guild_id}/auto-moderation/rules",
    'get+id+guild+id+moderation' = "/guilds/{guild_id}/auto-moderation/rules/{moderation_id}"
}
export declare enum UriMode {
    'create+id+channel+message' = 2,
    'get+id+guild+audit' = 0,
    'get+id+guild+moderation' = 0,
    'get+id+guild+id+moderation' = 0
}
