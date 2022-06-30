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
    MessageData,
    MessageDeleteEventData,
    MessageReferenceData,
    MessageUpdateEventData,
    SnowflakeData,
    StickerData
} from "./dataType";
import {isEmpty} from "./util";
import {EmptyMessageError} from "./errors";

let messageCache: Map<[SnowflakeData, SnowflakeData], MessageData> = new Map();
packEvent("message_create")(async (data: MessageCreateEventData) => {
    messageCache.set([data.channel_id, data.id], data);
});

packEvent("message_update")(async (data: MessageUpdateEventData) => {
    messageCache.set([data.channel_id, data.id], data);
});

packEvent("message_delete")(async (data: MessageDeleteEventData) => {
    messageCache.delete([data.channel_id, data.id]);
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
    }) {
        if (isEmpty(message))
            throw new EmptyMessageError();

        let { content, embeds, sticker_ids, attachments } = message;
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data: {
                content,
                embeds,
                sticker_ids,
                attachments,
                ...option,
                flag: 0
            },
            cache: (data: MessageData) => messageCache.set([data.channel_id, data.id], data)
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
        cache: (data: MessageData) => messageCache.set([data.channel_id, data.id], data)
    };
}

export async function getMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    if (messageCache.has([channel_id, message_id]))
        return {
            uri: (base: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => messageCache.get([channel_id, message_id])
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

export function crosspostMessage(channel_id: SnowflakeData) {
    return async function(message_id: SnowflakeData) {

    }
}