import { ChannelTypes, HttpRequestData, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from '@discall/types';
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
export default function channel(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function channel(data: HttpRequestData): HttpRequestData;
export default function channel(settings: CreateChannelSettings, options?: CreateChannelOptions): HttpRequestData;
export default function channel(settings: ModifyChannelSettings, options?: ModifyChannelOptions): HttpRequestData;
export {};
