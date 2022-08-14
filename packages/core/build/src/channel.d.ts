import { ChannelTypes, HttpRequestData, OverwriteData, SnowflakeData, VideoQualityModes, VoiceRegionData } from '@discall/types';
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
