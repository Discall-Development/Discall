import { AllowMentionsData, AttachmentData, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, HttpRequestData, MessageComponentData, MessageFlag, MessageReferenceData, SnowflakeData } from '@discall/types';
export default function message<T extends typeof message>(id: SnowflakeData): T;
export default function message(param: HttpRequestData): HttpRequestData;
export default function message(message: {
    content?: string;
    embeds?: EmbedData[];
    sticker_ids?: SnowflakeData[];
    attachments?: Partial<AttachmentData>[];
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
