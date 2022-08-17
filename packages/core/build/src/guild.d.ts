import { HttpRequestData, SnowflakeData, ImageScheme, RoleData, ChannelTypes, VerificationLevel, DefaultMessageNotificationLevel, ExplicitContentFilterLevel, SystemChannelFlags, LocaleOption } from '@discall/types';
export default function guild<T extends typeof guild>(id: SnowflakeData): T;
export default function guild(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function guild(data: HttpRequestData): HttpRequestData;
export default function guild(settings: {
    name: string;
    icon?: ImageScheme | null;
    roles?: RoleData[];
    channels?: {
        name: string;
        type: ChannelTypes;
        id?: SnowflakeData;
        parent_id?: SnowflakeData;
    };
}, options?: {
    verification_level?: VerificationLevel | null;
    default_message_notifications?: DefaultMessageNotificationLevel | null;
    explict_content_filter?: ExplicitContentFilterLevel | null;
    afk_channel_id?: SnowflakeData | null;
    afk_timeout?: number;
    system_channel_id?: SnowflakeData | null;
    system_channel_flags?: SystemChannelFlags;
}): HttpRequestData;
export default function guild(settings: {
    name?: string;
    icon?: ImageScheme | null;
    description?: string | null;
    splash?: ImageScheme | null;
    discordvey_splash?: ImageScheme | null;
    banner?: ImageScheme | null;
    owner_id?: SnowflakeData;
}, options?: {
    verification_level?: VerificationLevel | null;
    default_message_notifications?: DefaultMessageNotificationLevel | null;
    explict_content_filter?: ExplicitContentFilterLevel | null;
    afk_channel_id?: SnowflakeData | null;
    afk_timeout?: number;
    system_channel_id?: SnowflakeData | null;
    system_channel_flags?: SystemChannelFlags;
    rules_channel_id?: SnowflakeData | null;
    public_updates_channel_id?: SnowflakeData | null;
    preferred_locale?: LocaleOption | null;
    premium_progress_bar_enabled?: boolean;
}): HttpRequestData;
