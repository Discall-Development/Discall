import {SnowflakeData} from "./dataType";

export function EditChannelPermissions(channel_id: SnowflakeData, overwrite_id: SnowflakeData) {
    return async function({ allow, deny, type }: {
        allow?: string;
        deny?: string;
        type: 0 | 1;
    }, reason?: string) {
        if (allow === undefined)
            allow = "0";

        if (deny === undefined)
            deny = "0";

        return {
            uri: (base: URL) => {
                base.pathname += `channels/${channel_id}/permissions/${overwrite_id}`;
                return {
                    uri: base.toString(),
                    mode: "PATCH"
                };
            },
            data: { allow, deny, type },
            reason
        };
    };
}

export function deleteChannelPermissions(channel_id: SnowflakeData, overwrite_id: SnowflakeData) {
    return async function(reason?: string) {
        return {
            uri: (base: URL) => {
                base.pathname += `channels/${channel_id}/permissions/${overwrite_id}`;
                return {
                    uri: base.toString(),
                    mode: "DELETE"
                };
            },
            reason
        };
    };
}

export function createPermissions(permissions: number[]) {
    let permission = 0;
    for (const _per of permissions)
        permission |= _per;

    return permission.toString();
}