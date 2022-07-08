import {
    EmojiData,
    GuildCreateEventData,
    GuildEmojisUpdateEventData,
    MessageReactionAddEventData,
    MessageReactionRemoveAllEventData,
    MessageReactionRemoveEmojiEventData,
    MessageReactionRemoveEventData,
    ReadyEventData,
    SnowflakeData,
    UserData
} from "./dataType";
import {packEvent} from "./event";
import {cacheDelete, cacheGet, cacheHas, cacheSet} from "./util/cache";

let emojiCache: Map<SnowflakeData, EmojiData[]> = new Map(); // guild_id -> emojis
let messageReactionUserCache: Map<SnowflakeData, Map<SnowflakeData, Map<string, Set<SnowflakeData>>>> = new Map(); // channel_id -> message_id -> emoji -> user_ids
let messageReactionCache: Map<SnowflakeData, Map<SnowflakeData, Set<string>>> = new Map(); // channel_id -> message_id -> emojis

let bot: UserData;
packEvent("ready")(async (data: ReadyEventData) => bot = data.user);
packEvent("guild_create")(async (data: GuildCreateEventData) => {
    emojiCache.set(data.id, data.emojis.map(v => toEmojiPair(v)));
});

packEvent("guild_emojis_update")(async (data: GuildEmojisUpdateEventData) => {
    emojiCache.set(data.guild_id, data.emojis.map(v => toEmojiPair(v)));
});

packEvent("message_reaction_add")(async (data: MessageReactionAddEventData) => {
    let userCache = cacheGet(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)]) || new Set();
    let reactionCache = cacheGet(messageReactionCache, [data.channel_id, data.message_id]) || new Set();

    cacheSet(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)], userCache.add(data.user_id));
    cacheSet(messageReactionCache, [data.channel_id, data.message_id], reactionCache.add(packEmoji(data.emoji)));
});

packEvent("message_reaction_remove")(async (data: MessageReactionRemoveEventData) => {
    let userCache = cacheGet(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)]);
    let reactionCache = cacheGet(messageReactionCache, [data.channel_id, data.message_id]);

    if (userCache && reactionCache) {
        userCache.delete(data.user_id);
        reactionCache.delete(packEmoji(data.emoji));

        if (userCache.size === 0)
            cacheDelete(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)]);
        else
            cacheSet(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)], userCache);

        if (reactionCache.size === 0)
            cacheDelete(messageReactionCache, [data.channel_id, data.message_id]);
        else
            cacheSet(messageReactionCache, [data.channel_id, data.message_id], reactionCache);
    }
});

packEvent("message_reaction_remove_all")(async (data: MessageReactionRemoveAllEventData) => {
    let reactionCache = cacheGet(messageReactionCache, [data.channel_id, data.message_id]);
    if (reactionCache !== undefined) {
        for (let emoji of reactionCache)
            cacheDelete(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(emoji)]);
        cacheDelete(messageReactionCache, [data.channel_id, data.message_id]);
    }
});

packEvent("message_reaction_remove_emoji")(async (data: MessageReactionRemoveEmojiEventData) => {
    let reactionCache = cacheGet(messageReactionCache, [data.channel_id, data.message_id]);
    if (reactionCache !== undefined) {
        cacheDelete(messageReactionUserCache, [data.channel_id, data.message_id, encodeEmoji(data.emoji)]);
        reactionCache.delete(packEmoji(data.emoji));
        cacheSet(messageReactionCache, [data.channel_id, data.message_id], reactionCache);
    }
});

function encodeEmoji(emoji: EmojiData) {
    if (emoji.id === null)
        return encodeURI(emoji.name as string);

    return `${emoji.name}:${emoji.id}`;
}

function packEmoji(emoji: EmojiData): string {
    return `${emoji.id}|${emoji.name}`;
}

function toEmojiPair(emoji: EmojiData): EmojiData {
    return {
        id: emoji.id,
        name: emoji.name
    };
}

export function createReaction(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(emoji: EmojiData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/reactions/${encodeEmoji(emoji)}/@me`;
                return {
                    uri: base.toString(),
                    mode: "PUT"
                };
            }
        };
    };
}

export function deleteReaction(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(emoji: EmojiData, user_id: SnowflakeData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/reactions/${encodeEmoji(emoji)}`;
                if (user_id === bot.id)
                    base.pathname += "/@me";
                else
                    base.pathname += `/${user_id}`;

                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            }
        };
    };
}

export function fetchReactions(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(emoji: EmojiData) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/reactions/${encodeEmoji(emoji)}`;
                return {
                    uri: base.toString(),
                    mode: "GET"
                };
            },
            cache: (data: UserData[]) => {
                cacheSet(messageReactionUserCache, [channel_id, message_id, encodeEmoji(emoji)], new Set(data.map(v => v.id)));
                let reactionCache = cacheGet(messageReactionCache, [channel_id, message_id]) || new Set();
                cacheSet(messageReactionCache, [channel_id, message_id], reactionCache.add(emoji));
            }
        };
    };
}

export function getReactions(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(emoji: EmojiData) {
        if (cacheHas(messageReactionCache, [channel_id, message_id]))
            return {
                uri: (base: URL) => {
                    return {
                        uri: "",
                        mode: "NONE"
                    };
                },
                cache: () => {
                    let userCache = cacheGet(messageReactionUserCache, [channel_id, message_id, encodeEmoji(emoji)]);
                    if (userCache !== undefined)
                        return [...userCache];

                    return [];
                }
            };

        return await fetchReactions(channel_id, message_id)(emoji);
    };
}

export function deleteReactions(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(reason?: string) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/reactions`;
                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            },
            reason
        };
    };
}

export function deleteEmojiReactions(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(emoji: EmojiData, reason?: string) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/reactions/${encodeEmoji(emoji)}`;
                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            },
            reason
        };
    };
}