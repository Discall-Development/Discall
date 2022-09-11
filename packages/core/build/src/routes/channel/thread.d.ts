import { AllowMentionsData, AttachmentData, ChannelTypes, EmbedData, HttpRequestData, MessageComponentData, SnowflakeData } from '@discall/types';
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
export default function thread(data_1: any, data_2: 'active' | 'private' | 'public' | 'joined'): HttpRequestData;
export default function thread(data: HttpRequestData): HttpRequestData;
export default function thread(settings: CreateMessageThreadSettings): HttpRequestData;
export default function thread(settings: CreateChannelThreadSettings): HttpRequestData;
export default function thread(settings: CreateFourmThreadSettings): HttpRequestData;
export {};
