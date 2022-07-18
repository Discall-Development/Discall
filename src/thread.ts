import { ChannelData, SnowflakeData, ThreadCreateEventData, ChannelTypes, ThreadUpdateEventData, ThreadDeleteEventData } from "./dataType";
import { packEvent } from "./event";
import { cacheGet, cacheSet } from "./util";

let threadCache: Map<SnowflakeData, ChannelData[]> = new Map();
packEvent("thread_create")(async (data: ThreadCreateEventData) => {
    let arr: any[] = cacheGet(threadCache, [data.parent_id]) || [];
    arr.push(data);
    cacheSet(threadCache, [data.parent_id], arr);
});

packEvent("thread_update")(async (data: ThreadUpdateEventData) => {
    let arr: any[] = cacheGet(threadCache, [data.parent_id]) || [];
    arr.push(data);
    cacheSet(threadCache, [data.parent_id], arr);
});

packEvent("thread_delete")(async (data: ThreadDeleteEventData) => {
    let arr: any[] = cacheGet(threadCache, [data.parent_id]) || [];
    let idx = arr.findIndex(v => {
        return v.id === data.id;
    });
    delete arr[idx];
    cacheSet(threadCache, [data.parent_id], arr);
});

export function startThread(channel_id: SnowflakeData, message_id?: SnowflakeData) {
    if (message_id)
        return startThreadWithMessage(channel_id, message_id);
    else
        return startThreadWithoutMessage(channel_id);
}

function startThreadWithMessage(channel_id: SnowflakeData, message_id: SnowflakeData) {
    return async function(data: {
        name: string;
        auto_archive_duration?: number;
        rate_limit_per_user?: number | null;
    }, reason?: string) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages/${message_id}/threads`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data,
            reason
        }
    };
}

function startThreadWithoutMessage(channel_id: SnowflakeData) {
    return async function(data: {
        name: string;
        type?: ChannelTypes;
        invitable?: boolean;
        auto_archive_duration?: number;
        rate_limit_per_user?: number | null;
    }, reason?: string) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/threads`;
                return {
                    uri: base.toString(),
                    mode: "POST"
                };
            },
            data,
            reason
        }
    };
}