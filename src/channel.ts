import {
    AllowMentionsData,
    AttachmentData,
    ChannelCreateEventData,
    ChannelData,
    ChannelDeleteEventData,
    ChannelFlags,
    ChannelTypes,
    ChannelUpdateEventData,
    EmbedAuthorData,
    EmbedData,
    EmbedFieldData,
    EmbedFooterData,
    GuildCreateEventData,
    MessageComponentData,
    MessageCreateEventData,
    MessageData,
    MessageDeleteEventData,
    MessageReferenceData,
    MessageUpdateEventData,
    OverwriteData,
    SnowflakeData,
    StickerData,
    VideoQualityModes
} from "./dataType";
import {EditWithEmptyData, EmptyMessageError} from "./errors";
import {packEvent} from "./event";
import {isEmpty} from "./util";

let Global: {
    channelCache: Map<SnowflakeData, ChannelData>
    messageCache: Map<[SnowflakeData, SnowflakeData], MessageData>
} = {
    channelCache: new Map(),
    messageCache: new Map()
};

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
    Global.messageCache.set([data.channel_id, data.id], data);
});

packEvent("message_update")(async (data: MessageUpdateEventData) => {
    Global.messageCache.set([data.channel_id, data.id], data);
});

packEvent("message_delete")(async (data: MessageDeleteEventData) => {
    Global.messageCache.delete([data.channel_id, data.id]);
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
            cache: (data: MessageData) => Global.messageCache.set([data.channel_id, data.id], data)
        };
    };
}

export function fetchMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}/messages/${message_id}`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        },
        cache: (data: MessageData) => Global.messageCache.set([data.channel_id, data.id], data)
    };
}

export function getMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    if (Global.messageCache.has([channel_id, message_id]))
        return {
            uri: (base: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => Global.messageCache.get([channel_id, message_id])
        };

    return fetchMessage(channel_id, message_id);
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

export function fetchChannel(channel_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        },
        cache: (data: ChannelData) => Global.channelCache.set(data.id, data)
    };
}

export function getChannel(channel_id: SnowflakeData) {
    if (Global.channelCache.has(channel_id))
        return {
            uri: (base: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => Global.channelCache.get(channel_id)
        };

    return fetchChannel(channel_id);
}

export function editChannel(type: "dm" | "guild" | "thread") {
    switch (type) {
        case "dm":
            return editDMChannel;
        case "guild":
            return editGuildChannel;
        case "thread":
            return editGuildThread;
    }
}

function editDMChannel(channel_id: SnowflakeData) {
    return function(data: {
        name?: string;
        icon?: string;
    }) {
        if (isEmpty(data))
            throw new EditWithEmptyData("dm_channel");

        if (data.name === '')
            delete data.name;

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data,
            cache: (data: ChannelData) => Global.channelCache.set(data.id, data)
        }
    }
}

function editGuildChannel(channel_id: SnowflakeData) {
    return function(data: {
        name?: string;
        type?: ChannelTypes;
        position?: number | null;
        topic?: string | null;
        nsfw?: boolean | null;
        rate_limit_per_user?: number | null;
        bitrate?: number | null;
        user_limit?: number | null;
        permission_overwrites?: OverwriteData[] | null;
        parent_id?: SnowflakeData | null;
        rtc_region?: string | null;
        video_quality_mode?: VideoQualityModes | null;
        default_auto_archive_duration?: number | null;
    }) {
        if (isEmpty(data))
            throw new EditWithEmptyData("guild_channel");

        if (data.name === '')
            delete data.name;

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data,
            cache: (data: ChannelData) => Global.channelCache.set(data.id, data)
        }
    }
}

function editGuildThread(channel_id: SnowflakeData) {
    return function(data: {
        name?: string;
        archived?: boolean;
        auto_archive_duration?: number;
        locked?: boolean;
        invitable?: boolean;
        rate_limit_per_user?: number | null;
        flags?: ChannelFlags;
    }) {
        if (isEmpty(data))
            throw new EditWithEmptyData("guild_thread");

        if (data.name === '')
            delete data.name;

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data,
            cache: (data: ChannelData) => Global.channelCache.set(data.id, data)
        }
    }
}