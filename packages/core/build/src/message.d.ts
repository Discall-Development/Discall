import { AllowMentionsData, AttachmentData, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, HttpRequestData, MessageComponentData, MessageFlag, MessageReferenceData, SnowflakeData } from '@discall/types';
export default function message<T extends typeof message>(id: SnowflakeData): T;
export default function message(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function message(data: HttpRequestData): HttpRequestData;
export default function message(content: {
    content?: string;
    embeds?: EmbedData[];
    attachments?: AttachmentData[];
    sticker_ids?: SnowflakeData[];
}, options?: {
    tts?: boolean;
    allow_mentions?: AllowMentionsData;
    message_reference?: MessageReferenceData;
    components?: MessageComponentData[];
    flags?: MessageFlag;
}): HttpRequestData;
export declare function attachments(files: Record<string, string>): Partial<AttachmentData>[];
export declare function embeds(embeds: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooterData;
    image?: string;
    thumbnail?: string;
    author?: EmbedAuthorData;
    fields?: EmbedFieldData[];
}[]): {
    embeds: EmbedData[];
    attachments: Partial<AttachmentData>[];
};
