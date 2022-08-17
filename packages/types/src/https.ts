import { SnowflakeData } from './snowflake';

export enum HttpMode {
    GET,
    DELETE,
    POST,
    PUT,
    PATCH
}

export interface HttpRequest {
    uri: (base: URL) => { uri: string, mode: HttpMode };
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

export enum HttpUri {
    'get+id+guild+audit' = '/guilds/{guild_id}/audit-logs{query}',
    'get+id+guild+moderation' = '/guilds/{guild_id}/auto-moderation/rules',
    'get+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'create+id+guild+moderation' = '/guilds/{guild_id}/auto-moderation/rules',
    'edit+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'remove+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'create+id+channel+message' = '/channels/{channel_id}/messages',
}

export enum UriMode {
    'get+id+guild+audit' = HttpMode.GET,
    'get+id+guild+moderation' = HttpMode.GET,
    'get+id+guild+id+moderation' = HttpMode.GET,
    'create+id+guild+moderation' = HttpMode.POST,
    'edit+id+guild+id+moderation' = HttpMode.PATCH,
    'remove+id+guild+id+moderation' = HttpMode.DELETE,
    'create+id+channel+message' = HttpMode.POST,
}