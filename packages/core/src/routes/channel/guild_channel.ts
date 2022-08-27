import { ChannelTypes, HttpRequestData, isHttpRequestData, isSnowflake, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from '@discall/types';

// interface CreateDmSettings {
//     recipient_id: SnowflakeData;
// }

interface CreateChannelSettings {
    name: string;
    type?: ChannelTypes | null;
    position?: number | null;
    nsfw?: boolean | null;
    parent_id?: SnowflakeData | null;
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
    topic?: string | null;
    rate_limit_per_user?: number | null;
    bitrate?: number | null;
    user_limit?: number | null;
    permission_overwrites?: Partial<OverwriteData>[] | null;
    rtc_region?: VoiceRegionData['id'] | null;
    video_quality_mode?: VideoQualityModes | null;
    default_auto_archive_duration?: number | null;
}

interface ModifyChannelPositionSettings {
    id: SnowflakeData;
    position: number | null;
    lock_permissions: boolean | null;
    parent_id: SnowflakeData | null;
}

interface FollowChannelsSettings {
    webhook_channel_id: SnowflakeData[];
}

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function channel(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function channel(data: HttpRequestData): HttpRequestData;
export default function channel(): HttpRequestData;
export default function channel(settings: CreateChannelSettings): HttpRequestData;
export default function channel(settings: ModifyChannelSettings): HttpRequestData;
export default function channel(settings: FollowChannelsSettings): HttpRequestData;
export default function channel<T extends typeof channel>(
    arg_1?: CreateChannelSettings | ModifyChannelSettings | ModifyChannelPositionSettings | FollowChannelsSettings | SnowflakeData | HttpRequestData,
    arg_2?: SnowflakeData
): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                channel_id: arg_2,
                data: channel(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => channel(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'channel',
            data: arg_1
        };

    if (!arg_1)
        return {
            type: 'channel+empty',
            data: {}
        };

    return {
        type: 'channel',
        data: { ...arg_1 }
    };
}