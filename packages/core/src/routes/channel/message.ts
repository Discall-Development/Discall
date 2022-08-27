import { AllowMentionsData, AttachmentData, EmbedData, HttpRequestData, isHttpRequestData, isSnowflake, MessageComponentData, MessageFlag, MessageReferenceData, SnowflakeData } from '@discall/types';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function message(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function message(data: HttpRequestData): HttpRequestData;
export default function message(filters: GetMessagesFilters): HttpRequestData;
export default function message(messages: SnowflakeData[]): HttpRequestData;
export default function message(settings: CreateMessageSettings): HttpRequestData;
export default function message(settings: EditMessageSettings): HttpRequestData;
export default function message<T extends typeof message = typeof message>(
    arg_1: CreateMessageSettings | SnowflakeData[] | EditMessageSettings | GetMessagesFilters | SnowflakeData | HttpRequestData,
    arg_2?: SnowflakeData
): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                message_id: arg_2,
                data: message(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => message(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'message',
            data: arg_1
        };

    return {
        type: 'message',
        data: { ...arg_1 }
    };
}

export function pins(id: SnowflakeData): HttpRequestData;
export function pins(arg_1: SnowflakeData): HttpRequestData {
    return {
        type: 'pins',
        data: {
            message_id: arg_1,
            data: {}
        }
    };
}