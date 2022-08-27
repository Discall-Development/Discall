import { AllowMentionsData, AttachmentData, EmbedData, HttpRequestData, MessageComponentData, MessageFlag, MessageReferenceData, SnowflakeData } from '@discall/types';
interface CreateMessageSettings {
    content?: string;
    embeds?: EmbedData[];
    attachments?: AttachmentData[];
    sticker_ids?: SnowflakeData[];
    tts?: boolean;
    allowed_mentions?: AllowMentionsData;
    message_reference?: MessageReferenceData;
    components?: MessageComponentData[];
    flags?: MessageFlag;
}
interface EditMessageSettings {
    content?: string | null;
    embeds?: EmbedData[] | null;
    attachments?: AttachmentData[] | null;
    allowed_mentions?: AllowMentionsData | null;
    components?: MessageComponentData[] | null;
    flags?: MessageFlag | null;
}
interface GetMessagesFilters {
    around?: SnowflakeData;
    before?: SnowflakeData;
    after?: SnowflakeData;
    limit?: number;
}
export default function message<T extends typeof message>(id: SnowflakeData): T;
export default function message(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function message(data: HttpRequestData): HttpRequestData;
export default function message(filters: GetMessagesFilters): HttpRequestData;
export default function message(messages: SnowflakeData[]): HttpRequestData;
export default function message(settings: CreateMessageSettings): HttpRequestData;
export default function message(settings: EditMessageSettings): HttpRequestData;
export declare function pins(id: SnowflakeData): HttpRequestData;
export {};
