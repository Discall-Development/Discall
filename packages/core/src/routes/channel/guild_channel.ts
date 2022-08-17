import { ChannelTypes, HttpRequestData, isHttpRequestData, isSnowflake, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from '@discall/types';

// interface CreateDmSettings {
//     recipient_id: SnowflakeData;
// }

// interface CreateGroupDmSettings {
//     access_tokens: string[];
//     nicks: Record<SnowflakeData, string>;
// }

interface CreateChannelSettings {
    name: string;
    type?: ChannelTypes | null;
    position?: number | null;
    nsfw?: boolean | null;
    parent_id?: SnowflakeData | null;
}

interface CreateChannelOptions {
    topic?: string | null;
    bitrate?: number | null;
    user_limit?: number | null;
    rate_limit_per_user?: number | null;
    permission_overwrites?: Partial<OverwriteData>[] | null;
    rtc_region?: VoiceRegionData['id'] | null;
    video_quality_mode?: VideoQualityModes | null;
    default_auto_archive_duration?: number | null;
}

interface ModifyChannelSettings {
    name?: string;
    type?: ChannelTypes;
    position?: number | null;
    nsfw?: boolean | null;
    parent_id?: SnowflakeData | null;
}

interface ModifyChannelOptions {
    topic?: string | null;
    rate_limit_per_user?: number | null;
    bitrate?: number | null;
    user_limit?: number | null;
    permission_overwrites?: Partial<OverwriteData>[] | null;
    rtc_region?: VoiceRegionData['id'] | null;
    video_quality_mode?: VideoQualityModes | null;
    default_auto_archive_duration?: number | null;
}

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function channel(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function channel(data: HttpRequestData): HttpRequestData;
export default function channel(settings: CreateChannelSettings, options?: CreateChannelOptions): HttpRequestData;
export default function channel(settings: ModifyChannelSettings, options?: ModifyChannelOptions): HttpRequestData;
export default function channel<T extends typeof channel>(
    arg_1: CreateChannelSettings | ModifyChannelSettings | SnowflakeData | HttpRequestData,
    arg_2: CreateChannelOptions | ModifyChannelOptions = {},
    arg_3?: SnowflakeData
): HttpRequestData | T {
    if (arg_3 && isSnowflake(arg_3))
        return {
            type: 'id',
            data: {
                channel_id: arg_3,
                data: channel(arg_1 as never, arg_2)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown, param_2: unknown) => channel(param_1, param_2, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'channel',
            data: arg_1
        };

    return {
        type: 'channel',
        data: { ...arg_1, ...arg_2 }
    };
}