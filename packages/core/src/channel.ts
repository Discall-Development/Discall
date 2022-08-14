import { ChannelTypes, HttpRequestData, isAny, isHttpRequestData, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from '@discall/types';

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function channel(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function channel(data: HttpRequestData): HttpRequestData;
export default function channel(dm: {
    recipient_id: SnowflakeData;
}): HttpRequestData;
export default function channel(qroupDm: {
    access_tokens: string[];
    nicks: Record<SnowflakeData, string>;
}): HttpRequestData;
export default function channel(channel: {
    name?: string | null;
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
    rtc_region?: VoiceRegionData['id'] | null;
    video_quality_mode?: VideoQualityModes | null;
    default_auto_archive_duration?: number | null;
}): HttpRequestData;
export default function channel(arg_1: unknown, arg_2?: unknown) {
    if (typeof arg_1 === 'string')
        return function(param_1?: unknown, param_2?: unknown): HttpRequestData {
            if (isHttpRequestData(param_1))
                return {
                    type: 'id',
                    data: {
                        channel_id: arg_1,
                        data: param_1
                    }
                };

            if (!isAny(param_1))
                return {
                    type: 'channel+info',
                    data: {}
                };

            return {
                type: 'channel+id',
                data: {
                    channel_id: arg_1,
                    data: channel(param_1 as Record<string, unknown>, param_2 as never)
                }
            };
        };

    if (isHttpRequestData(arg_1))
        return {
            type: 'channel',
            data: arg_1
        } as HttpRequestData;

    return {
        type: 'channel',
        data: { ...arg_1 as Record<string, unknown>, ...arg_2 as Record<string, unknown> }
    };
}