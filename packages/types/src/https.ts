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
    'get+id+channel' = '/channels/{channel_id}',
    'edit_id+channel' = '/channels/{channel_id}',
    'remove+id+channel' = '/channels/{channel_id}',
    'get+id+channel+message' = '/channels/{channel_id}/messages',
    'get+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'create+id+channel+message' = '/channels/{channel_id}/messages',
    'create+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}/crosspost',
    'create+id+channel+id+message+bot+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+bot+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+id+reaction' = '/channels/{channel_id}/messages/{message_id}/reaction/{emoji}/{user_id}',
    'get+id+channel+id+message+reaction' = '/channels/{channel_id}/messages/{message_id}/reaction/{emoji}{query}'
}

export enum UriMode {
    'get+id+guild+audit' = HttpMode.GET,
    'get+id+guild+moderation' = HttpMode.GET,
    'get+id+guild+id+moderation' = HttpMode.GET,
    'create+id+guild+moderation' = HttpMode.POST,
    'edit+id+guild+id+moderation' = HttpMode.PATCH,
    'remove+id+guild+id+moderation' = HttpMode.DELETE,
    'get+id+channel' = HttpMode.GET,
    'edit+id+channel' = HttpMode.PATCH,
    'remove+id+channel' = HttpMode.DELETE,
    'get+id+channel+message' = HttpMode.GET,
    'get+id+channel+id+message' = HttpMode.GET,
    'create+id+channel+message' = HttpMode.POST,
    'create+id+channel+id+message' = HttpMode.POST,
    'create+id+channel+id+message+bot+reaction' = HttpMode.PUT,
    'remove+id+channel+id+message+bot+reaction' = HttpMode.DELETE,
    'remove+id+channel+id+message+id+reaction' = HttpMode.DELETE,
    'get+id+channel+id+message+reaction' = HttpMode.GET
}