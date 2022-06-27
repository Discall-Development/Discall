import {
    AllowMentionsData,
    AttachmentData,
    ChannelCreateEventData,
    ChannelData,
    ChannelDeleteEventData,
    ChannelUpdateEventData,
    EmbedAuthorData,
    EmbedData,
    EmbedFieldData,
    EmbedFooterData,
    GuildCreateEventData,
    MessageComponentData,
    MessageCreateEventData,
    MessageData,
    MessageFlag,
    MessageReferenceData,
    SnowflakeData,
    StickerData
} from "./dataType";
import {EmptyMessageError} from "./errors";
import isEmpty from "./util/isEmpty";
import {packEvent} from "./event";

let Global: {
    channelCache: Map<SnowflakeData, ChannelData>
    messageCache: Map<SnowflakeData, MessageData>
} = {
    channelCache: new Map(),
    messageCache: new Map()
}

packEvent("guild_create")(async (data: GuildCreateEventData) => {
    for (const channel of data.channels) {
        Global.channelCache.set(channel.id, channel);
    }
});

packEvent("channel_create")(async (data: ChannelCreateEventData) => {
    Global.channelCache.set(data.id, data);
});

packEvent("channel_update")(async (data: ChannelUpdateEventData) => {
    Global.channelCache.set(data.id, data);
});

packEvent("channel_delete")(async (data: ChannelDeleteEventData) => {
    Global.channelCache.delete(data.id);
});

packEvent("message_create")(async (data: MessageCreateEventData) => {
    Global.messageCache.set(data.id, data);
});

export function createMessage(channel_id: SnowflakeData) {
    return function(message: {
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
                ...option
            }
        };
    };
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

export async function fetchChannel(channel_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        }
    };
}

export async function getChannel(channel_id: SnowflakeData) {
    if (Global.channelCache.has(channel_id)) {
        return {
            uri: {
                uri: "",
                mode: "NONE"
            },
            cache: (data: ChannelData) => {
                Global.channelCache.set(data.id, data);
            }
        };
    }
}