import {packEvent} from "./event";
import {
    AllowMentionsData,
    AttachmentData,
    EmbedAuthorData,
    EmbedData,
    EmbedFieldData,
    EmbedFooterData,
    MessageComponentData,
    MessageCreateEventData,
    MessageData, MessageDeleteBulkEventData,
    MessageDeleteEventData, MessageFlag,
    MessageReferenceData,
    MessageUpdateEventData,
    SnowflakeData,
    StickerData
} from "./dataType";
import {EmptyMessageError} from "./errors";
import {isEmpty, cacheDelete, cacheGet, cacheHas, cacheSet} from "./util";

let messageCache: Map<SnowflakeData, Map<SnowflakeData, MessageData>> = new Map();
packEvent("message_create")(async (data: MessageCreateEventData) => {
    cacheSet(messageCache, [data.channel_id, data.id], data);
});

packEvent("message_update")(async (data: MessageUpdateEventData) => {
    cacheSet(messageCache, [data.channel_id, data.id], data);
});

packEvent("message_delete")(async (data: MessageDeleteEventData) => {
    cacheDelete(messageCache, [data.channel_id, data.id]);
});

packEvent("message_delete_bulk")(async (data: MessageDeleteBulkEventData) => {
    for (const id of data.ids)
        cacheDelete(messageCache, [data.channel_id, id]);
});

export function createMessage(channel_id: SnowflakeData) {
    return async function(message: {
        content?: string;
        embeds?: EmbedData[];
        sticker_ids?: SnowflakeData[];
        attachments?: Partial<AttachmentData>[];
    }, option?: {
        tts?: boolean;
        allow_mentions: AllowMentionsData;
        message_reference?: MessageReferenceData;
        components?: MessageComponentData[];
        flags?: MessageFlag;
    }) {
        if (isEmpty(message))
            throw new EmptyMessageError();

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data: { ...message, ...option },
            cache: (data: MessageData) => cacheSet(messageCache, [data.channel_id, data.id], data)
        };
    };
}

export async function fetchMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}/messages/${message_id}`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        },
        cache: (data: MessageData) => cacheSet(messageCache, [data.channel_id, data.id], data)
    };
}

export async function getMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    if (cacheHas(messageCache, [channel_id, message_id]))
        return {
            uri: (base: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => cacheGet(messageCache, [channel_id, message_id])
        };

    return await fetchMessage(channel_id, message_id);
}

export function createAttachments(files: Record<string, string>): Partial<AttachmentData>[] | undefined {
    if (!files)
        return;

    let results: Partial<AttachmentData>[] = [];
    let idx = 0;
    for (const file in files) {
        results.push({
            id: idx.toString(),
            description: files[file],
            filename: file
        }); idx++;
    }

    return results;
}

export function createEmbeds(embeds: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooterData;
    image?: string;
    thumbnail?: string;
    author?: EmbedAuthorData;
    fields?: EmbedFieldData[];
}[]) {
    let result: EmbedData[] = [];
    let files: Record<string, string> = {};

    for (const data of embeds.values()) {
        let obj: EmbedData = {
            title: data.title,
            description: data.description,
            url: data.url,
            timestamp: data.timestamp?.toISOString(),
            color: data.color,
            footer: data.footer,
            author: data.author,
            fields: data.fields
        };

        if (data.image !== undefined && !isEmpty(data.image)) {
            let { url, file } = pathToUrlWithFile(data.image);
            obj.image = { url };

            if (file)
                files[file] = "";
        }

        if (data.thumbnail !== undefined && !isEmpty(data.thumbnail)) {
            let { url, file } = pathToUrlWithFile(data.thumbnail);
            obj.thumbnail = { url };

            if (file)
                files[file] = "";
        }

        if (!isEmpty(obj))
            result.push({ ...obj, type: "rich" });
    }

    return { embeds: result, attachments: createAttachments(files) };
}

function pathToUrlWithFile(path: string): {
    url: string,
    file: string | null
} {
    if (path.startsWith("https://"))
        return { url: path, file: null };

    if (path.startsWith("attachment://"))
        return { url: path, file: path.split("attachment://")[1] };

    return { url: "attachment://" + path.split("/").slice(-1), file: path };
}

export function createStickers(stickers: StickerData[]) {
    return stickers.map(v => v.id);
}

export async function crosspostMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}/messages/${message_id}/crosspost`;
            return {
                uri: base.toString(),
                mode: "POST"
            };
        },
        cache: (data: MessageData) => cacheSet(messageCache, [data.channel_id, data.id], data)
    };
}

export function editMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(message: {
        content: string;
        embeds: EmbedData[];
        attachments: AttachmentData[];
    }, option?: {
        components: MessageComponentData[];
        allow_mentions?: AllowMentionsData;
        flags?: MessageFlag;
    }) {
        if (isEmpty(message))
            throw new EmptyMessageError();

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data: { ...message, ...option },
            cache: (data: MessageData) => cacheSet(messageCache, [data.channel_id, data.id], data)
        };
    };
}

export function deleteMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function() {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}`;
                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            }
        };
    };
}

export function deleteBulkMessage(channel_id: SnowflakeData) {
    return async function(messages: SnowflakeData[]) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/bulk-delete`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data: { messages }
        };
    };
}