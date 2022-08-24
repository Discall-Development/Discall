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
    'get+id+guild+audit' = "/guilds/{guild_id}/audit-logs{query}",
    'get+id+guild+moderation' = "/guilds/{guild_id}/auto-moderation/rules",
    'get+id+guild+id+moderation' = "/guilds/{guild_id}/auto-moderation/rules/{moderation_id}",
    'create+id+guild+moderation' = "/guilds/{guild_id}/auto-moderation/rules",
    'edit+id+guild+id+moderation' = "/guilds/{guild_id}/auto-moderation/rules/{moderation_id}",
    'remove+id+guild+id+moderation' = "/guilds/{guild_id}/auto-moderation/rules/{moderation_id}",
    'get+id+channel' = "/channels/{channel_id}",
    'edit_id+channel' = "/channels/{channel_id}",
    'remove+id+channel' = "/channels/{channel_id}",
    'get+id+channel+message' = "/channels/{channel_id}/messages",
    'get+id+channel+id+message' = "/channels/{channel_id}/messages/{message_id}",
    'create+id+channel+message' = "/channels/{channel_id}/messages",
    'create+id+channel+id+message' = "/channels/{channel_id}/messages/{message_id}/crosspost",
    'create+id+channel+id+message+client+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me",
    'remove+id+channel+id+message+client+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me",
    'remove+id+channel+id+message+id+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}",
    'get+id+channel+id+message+all+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}{query}",
    'remove+id+channel+id+message+all+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions",
    'remove+id+channel+id+message+all+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}"
}
export declare enum UriMode {
    'get+id+guild+audit' = 0,
    'get+id+guild+moderation' = 0,
    'get+id+guild+id+moderation' = 0,
    'create+id+guild+moderation' = 2,
    'edit+id+guild+id+moderation' = 4,
    'remove+id+guild+id+moderation' = 1,
    'get+id+channel' = 0,
    'edit+id+channel' = 4,
    'remove+id+channel' = 1,
    'get+id+channel+message' = 0,
    'get+id+channel+id+message' = 0,
    'create+id+channel+message' = 2,
    'create+id+channel+id+message' = 2,
    'reate+id+channel+id+message+client+emoji+reaction' = 3,
    'remove+id+channel+id+message+client+emoji+reaction' = 1,
    'remove+id+channel+id+message+id+emoji+reaction' = 1,
    'get+id+channel+id+message+all+emoji+reaction' = 0,
    'remove+id+channel+id+message+all+reaction' = 1,
    'remove+id+channel+id+message+all+emoji+reaction' = 1
}
