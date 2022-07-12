import { InviteData, InviteMetadata, InviteTargetType, SnowflakeData } from "./dataType";
import { cacheGet, cacheHas, cacheSet } from "./util";

let invitesCache: Map<string, Map<SnowflakeData, (InviteData & InviteMetadata)[]>> = new Map();
export function GetInvites(position: "channel" | "guild") {
    switch (position) {
        case "channel":
            return getChhannelInvites;
        case "guild":
            return getGuildInivtes;
    }
}

async function getChhannelInvites(channel_id: SnowflakeData) {
    if (cacheHas(invitesCache, ["channel", channel_id]))
        return {
            uri: (_: URL) => {
                return {
                    uri: "",
                    mode: "NONE"
                };
            },
            cache: () => {
                return cacheGet(invitesCache, ["channel", channel_id]);
            }
        };

    return await fetchChhannelInvites(channel_id);
}

async function fetchChhannelInvites(channel_id: SnowflakeData) {
    return {
        uri: (base: URL) => {
            base.pathname += `channels/${channel_id}/invites`;
            return {
                uri: base.toString(),
                mode: "GET"
            };
        },
        cache: (invites: InviteData & InviteMetadata) => cacheSet(invitesCache, ["channel", channel_id], invites)
    };
}

async function getGuildInivtes(guild_id: SnowflakeData) {
    return {};
}

export function createInvite(position: "channel" | "guild") {
    switch (position) {
        case "channel":
            return createChannelInvite;
        case "guild":
            return createGuildInvite;
    }
}

async function createChannelInvite(channel_id: SnowflakeData, data: {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
    target_type?: InviteTargetType;
    target_user_id?: SnowflakeData;
    target_applicant_id?: SnowflakeData;
}, reason?: string) {
    if (data.target_type && data.target_type === InviteTargetType.STREAM)
        if (data.target_user_id === undefined)
            throw new Error("target_user_id is required");

    return {
        uri: (base: URL) => {
            base.pathname += `channels/${channel_id}/invites`;
            return {
                uri: base.toString(),
                mode: "POST"
            };
        },
        data,
        reason
    };
}

async function createGuildInvite(channel_id: SnowflakeData, data: {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
    target_type?: InviteTargetType;
    target_user_id?: SnowflakeData;
    target_applicant_id?: SnowflakeData;
}) {
    return {};
}