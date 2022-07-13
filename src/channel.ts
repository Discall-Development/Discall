import {
    ChannelCreateEventData,
    ChannelData,
    ChannelDeleteEventData,
    ChannelFlags,
    ChannelTypes,
    ChannelUpdateEventData,
    GuildCreateEventData,
    OverwriteData,
    SnowflakeData,
    VideoQualityModes
} from "./dataType";
import {EditWithEmptyData} from "./error";
import {packEvent} from "./event";
import {isEmpty} from "./util";
import * as fs from "node:fs/promises";

let channelCache: Map<SnowflakeData, ChannelData> = new Map();
packEvent("guild_create")(async (data: GuildCreateEventData) => {
    for (const channel of data.channels) {
        channelCache.set(channel.id, channel);
    }
});

packEvent("channel_create")(async (data: ChannelCreateEventData) => {
    channelCache.set(data.id, data);
});

packEvent("channel_update")(async (data: ChannelUpdateEventData) => {
    channelCache.set(data.id, data);
});

packEvent("channel_delete")(async (data: ChannelDeleteEventData) => {
    channelCache.delete(data.id);
});

export async function fetchChannel(channel_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        },
        cache: (data: ChannelData) => channelCache.set(data.id, data)
    };
}

export async function getChannel(channel_id: SnowflakeData) {
    if (channelCache.has(channel_id))
        return {
            uri: (base: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => channelCache.get(channel_id)
        };

    return await fetchChannel(channel_id);
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
    return async function(data: {
        name?: string;
        icon?: string;
    }) {
        if (isEmpty(data))
            throw new EditWithEmptyData("dm_channel");

        if (data.name === "")
            delete data.name;

        data.icon = await readImageBase64(data.icon as string);

        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data,
            cache: (data: ChannelData) => channelCache.set(data.id, data)
        };
    };
}

async function readImageBase64(path: string) {
    return await fs.readFile(path).then(r => r.toString("base64"));
}

function editGuildChannel(channel_id: SnowflakeData) {
    return async function(data: {
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

        if (data.name === "")
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
            cache: (data: ChannelData) => channelCache.set(data.id, data)
        };
    };
}

function editGuildThread(channel_id: SnowflakeData) {
    return async function(data: {
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

        if (data.name === "")
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
            cache: (data: ChannelData) => channelCache.set(data.id, data)
        };
    };
}

export async function deleteChannel(channel_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `/channels/${channel_id}`;
            return {
                uri: base.toString(),
                mode: "DELETE"
            };
        },
        cache: (data: ChannelData) => channelCache.delete(data.id)
    };
}

export function followNewsChannel(channel_id: SnowflakeData) {
    return async function (data: {
        webhook_channel_id: SnowflakeData;
    }) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/followers`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data
        };
    }
}