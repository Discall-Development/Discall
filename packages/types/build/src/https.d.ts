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
    'edit+id+channel' = "/channels/{channel_id}",
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
    'remove+id+channel+id+message+all+emoji+reaction' = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji}",
    'edit+id+channel+id+message' = "/channels/{channel_id}/messages/{message_id}",
    'remove+id+channel+id+message' = "/channels/{channel_id}/messages/{message_id}",
    'remove+id+channel+message' = "/channels/{channel_id}/messages/bulk-delete",
    'edit+id+channel+id+permission' = "/channels/{channel_id}/permissions/{overwrite_id}",
    'get+id+channel+invite' = "/channels/{channel_id}/invites",
    'create+id+channel+invite' = "/channels/{channel_id}/invites",
    'remove+id+channel+id+permission' = "/channels/{channel_id}/permissions/{overwrite_id}",
    'create+id+channel' = "/channels/{channel_id}/followers",
    'create+id+channel+empty' = "/channels/{channel_id}/typing",
    'get+id+channel+pins' = "/channels/{channel_id}/pins",
    'edit+id+channel+pins' = "/channels/{channel_id}/pins/{message_id}",
    'remove+id+channel+pins' = "/channels/{channel_id}/pins/{message_id}",
    'edit+id+channel+id+group' = "/channels/{channel_id}/recipents/{user_id}",
    'remove+id+channel+id+group' = "/channels/{channel_id}/recipents/{user_id}",
    'create+id+channel+id+message+thread' = "/channels/{channel_id}/messages/{message_id}/threads",
    'create+id+channel+thread' = "/channels/{channel_id}/threads",
    'edit+id+channel+thread' = "/channels/{channel_id}/thread-members/@me",
    'edit+id+channel+thread+id+member' = "/channel/{channel_id}/thread-members/{user_id}",
    'remove+id+channel+thread' = "/channels/{channel_id}/thread-members/@me",
    'remove+id+channel+thread+id+member' = "/channel/{channel_id}/thread-members/{user_id}",
    'get+id+channel+thread' = "/channels/{channel_id}/thread-members/@me",
    'get+id+channel+thread+id+member' = "/channel/{channel_id}/thread-members/{user_id}",
    'get+id+channel+thread+member' = "/channel/{channel_id}/thread-members",
    'get+id+channel+public+thread' = "/channel/{channel_id}/thread/archived/public",
    'get+id+channel+private+thread' = "/channel/{channel_id}/thread/archived/private",
    'get+id+channel+joined+thread' = "/channel/{channel_id}/users/@me/thread/archived/private"
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
    'remove+id+channel+id+message+all+emoji+reaction' = 1,
    'edit+id+channel+id+message' = 4,
    'remove+id+channel+id+message' = 1,
    'remove+id+channel+message' = 2,
    'edit+id+channel+id+permission' = 3,
    'get+id+channel+invite' = 0,
    'create+id+channel+invite' = 2,
    'remove+id+channel+id+permission' = 1,
    'create+id+channel' = 2,
    'create+id+channel+empty' = 2,
    'get+id+channel+pins' = 0,
    'edit+id+channel+pins' = 3,
    'remove+id+channel+pins' = 1,
    'edit+id+channel+id+group' = 3,
    'remove+id+channel+id+group' = 1,
    'create+id+channel+id+message+thread' = 2,
    'create+id+channel+thread' = 2,
    'edit+id+channel+thread' = 3,
    'edit+id+channel+thread+id+member' = 3,
    'remove+id+channel+thread' = 1,
    'remove+id+channel+thread+id+member' = 1,
    'get+id+channel+thread' = 0,
    'get+id+channel+thread+id+member' = 0,
    'get+id+channel+thread+member' = 0,
    'get+id+channel+public+thread' = 0,
    'get+id+channel+private+thread' = 0,
    'get+id+channel+joined+thread' = 0
}
