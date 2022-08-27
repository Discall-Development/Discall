import { AllowMentionsData, AttachmentData, ChannelTypes, EmbedData, HttpRequestData, isHttpRequestData, isString, MessageComponentData, SnowflakeData } from '@discall/types';

interface FourmThreadMessageParams {
    content?: string;
    embeds?: EmbedData[];
    allowed_mentions?: AllowMentionsData;
    components?: MessageComponentData[];
    sticker_ids?: SnowflakeData[];
    attachments?: AttachmentData[];
    flags?: number;
}

interface CreateChannelThreadSettings {
    name: string;
    auto_archive_duration?: number;
    type?: ChannelTypes.GUILD_NEWS_THREAD | ChannelTypes.GUILD_PRIVATE_THREAD | ChannelTypes.GUILD_PUBLIC_THREAD;
    invitable?: boolean;
    rate_limit_per_user?: number | null;
}

interface CreateMessageThreadSettings {
    name: string;
    auto_archive_duration?: number;
    rate_limit_per_user?: number | null;
}

interface CreateFourmThreadSettings {
    name: string;
    auto_archive_duration?: number;
    rate_limit_per_user?: number | null;
    message: FourmThreadMessageParams;
}

export default function thread<T extends typeof thread>(mode: 'active' | 'private' | 'public' | 'joined'): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function thread(data_1: any, data_2: 'active' | 'private' | 'public' | 'joined'): HttpRequestData;
export default function thread(data: HttpRequestData): HttpRequestData;
export default function thread(settings: CreateMessageThreadSettings): HttpRequestData;
export default function thread(settings: CreateChannelThreadSettings): HttpRequestData;
export default function thread(settings: CreateFourmThreadSettings): HttpRequestData;
export default function thread<T extends typeof thread>(arg_1: CreateMessageThreadSettings | CreateChannelThreadSettings | CreateFourmThreadSettings | HttpRequestData | 'active' | 'private' | 'public' | 'joined', arg_2?: 'active' | 'private' | 'public' | 'joined'): HttpRequestData | T {
    if (arg_2 && isString(arg_2))
        return {
            type: arg_2,
            data: { ...thread(arg_1 as never) }
        };

    if (arg_1 === 'active' || arg_1 === 'public' || arg_1 === 'private' || arg_1 === 'joined')
        return ((param_1: unknown) => thread(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'thread',
            data: arg_1
        };

    return {
        type: 'thread',
        data: { ...arg_1 }
    };
}