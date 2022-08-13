import { EmptyError } from "./error";
import { ChannelTypes, HttpRequestData, isHttpRequestData, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from "@discall/types";
import { isEmpty } from "./utils";

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
export default function channel(param: HttpRequestData): HttpRequestData;
export default function channel(dm: {
    recipient_id: SnowflakeData;
}): HttpRequestData;
export default function channel(qroupDm: {
    access_tokens: string[];
    nicks: Record<SnowflakeData, string>;
}): HttpRequestData;
export default function channel(channel: {
    name: string | null;
    type?: ChannelTypes | null;
    position?: number | null;
    nsfw?: boolean | null;
    parent_id?: number | null;
}, options?: {
    topic?: string | null;
    bitrate?: number | null;
    user_limit?: number | null;
    rate_limit_per_user?: number | null;
    permission_overwrites?: Partial<OverwriteData>[] | null;
    rtc_region?: VoiceRegionData["id"] | null;
    video_quality_mode?: VideoQualityModes | null;
    default_auto_archive_duration?: number | null;
}): HttpRequestData;
export default function channel(arg_1: any, arg_2?: any) {
    if (typeof arg_1 === "string")
        return function(param_1?: any, param_2?: any): HttpRequestData {
            if (isHttpRequestData(param_1))
                return {
                    type: "id",
                    data: {
                        channel_id: arg_1,
                        data: param_1
                    }
                };

            if (!param_1)
                return {
                    type: "channel+info",
                    data: {}
                };

            return {
                type: "channel+id",
                data: {
                    channel_id: arg_1,
                    data: channel(param_1, param_2)
                }
            };
        };

    if (typeof arg_1.type === "string" && arg_1.data)
        return {
            type: "channel",
            data: arg_1
        }

    return {
        type: "channel",
        data: { ...arg_1, ...arg_2 }
    };
}