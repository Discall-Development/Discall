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
    'create+id+channel+id+message+client+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+client+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+id+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}',
    'get+id+channel+id+message+all+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}{query}',
    'remove+id+channel+id+message+all+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions',
    'remove+id+channel+id+message+all+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}',
    'edit+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'remove+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'remove+id+channel+message' = '/channels/{channel_id}/messages/bulk-delete',
    'edit+id+channel+id+permission' = '/channels/{channel_id}/permissions/{overwrite_id}',
    'get+id+channel+invite+empty' = '/channels/{channel_id}/invites',
    'create+id+channel+invite' = '/channels/{channel_id}/invites',
    'remove+id+channel+id+permission' = '/channels/{channel_id}/permissions/{overwrite_id}',
    'create+id+channel' = '/channels/{channel_id}/followers',
    'create+id+channel+empty' = '/channels/{channel_id}/typing'
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
    'reate+id+channel+id+message+client+emoji+reaction' = HttpMode.PUT,
    'remove+id+channel+id+message+client+emoji+reaction' = HttpMode.DELETE,
    'remove+id+channel+id+message+id+emoji+reaction' = HttpMode.DELETE,
    'get+id+channel+id+message+all+emoji+reaction' = HttpMode.GET,
    'remove+id+channel+id+message+all+reaction' = HttpMode.DELETE,
    'remove+id+channel+id+message+all+emoji+reaction' = HttpMode.DELETE,
    'edit+id+channel+id+message' = HttpMode.PATCH,
    'remove+id+channel+id+message' = HttpMode.DELETE,
    'remove+id+channel+message' = HttpMode.POST,
    'edit+id+channel+id+permission' = HttpMode.PUT,
    'get+id+channel+invite+empty' = HttpMode.GET,
    'create+id+channel+invite' = HttpMode.POST,
    'remove+id+channel+id+permission' = HttpMode.DELETE,
    'create+id+channel' = HttpMode.POST
}