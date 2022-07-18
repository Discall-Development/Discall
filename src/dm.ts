import { SnowflakeData } from "./dataType";

export function addRecipient(channel_id: SnowflakeData, user_id: SnowflakeData) {
    return async function(data: {
        access_token: string;
        nick: string;
    }) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/recipients/${user_id}`;
                return {
                    uri: base.toString(),
                    mode: "PUT"
                };
            },
            data
        };
    };
}

export function removeRecipient(channel_id: SnowflakeData, user_id: SnowflakeData) {
    return async function() {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/recipients/${user_id}`;
                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            }
        };
    };
}