import { EmptyError } from "./error";
import { AllowMentionsData, AttachmentData, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, HttpRequestData, isHttpRequestData, MessageComponentData, MessageData, MessageFlag, MessageReferenceData, SnowflakeData } from "./types";
import { isEmpty } from "./utils";

export default function message<T extends typeof message>(id: SnowflakeData): T;
export default function message(param: HttpRequestData): HttpRequestData;
export default function message(message: {
    content?: string;
    embeds?: EmbedData[];
    sticker_ids?: SnowflakeData[];
    attachments?: Partial<AttachmentData>[];
}, options?: {
    tts?: boolean;
    allow_mentions: AllowMentionsData;
    message_reference?: MessageReferenceData;
    components?: MessageComponentData[];
    flags?: MessageFlag;
}): HttpRequestData;
export default function message(arg_1: any, arg_2?: any) {
    if (isEmpty(arg_1))
        throw new EmptyError("message");

    if (typeof arg_1 === "string")
        return function(param_1?: any, param_2?: any): HttpRequestData {
            if (isHttpRequestData(param_1))
                return {
                    type: "id",
                    data: {
                        message_id: arg_1,
                        data: param_1
                    }
                };

            if (!param_1)
                return {
                    type: "id",
                    data: {}
                };

            return {
                type: "message+id",
                data: {
                    message_id: arg_1,
                    data: message(param_1, param_2)
                }
            };
        };

    if (typeof arg_1.type === "string" && arg_1.data)
        return {
            type: "message",
            data: arg_1
        }

    return {
        type: "message",
        data: { ...arg_1, ...arg_2 }
    };
}

export function attachments(files: Record<string, string>): Partial<AttachmentData>[] {
    if (isEmpty(files))
        return [];

    let results: Partial<AttachmentData>[] = [];
    let idx = 0;
    for (const file in files) {
        results.push({
            id: idx.toString(),
            description: files[file],
            filename: file
        }); idx++;
    }

    return results;
}

export function embeds(embeds: {
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
}[]) {
    let result: EmbedData[] = [];
    let files: Record<string, string> = {};

    for (const data of embeds.values()) {
        let obj: EmbedData = {
            title: data.title,
            description: data.description,
            url: data.url,
            timestamp: data.timestamp?.toISOString(),
            color: data.color,
            footer: data.footer,
            author: data.author,
            fields: data.fields
        };

        if (data.image !== undefined && !isEmpty(data.image)) {
            let { url, file } = pathToUrlWithFile(data.image);
            obj.image = { url };

            if (file)
                files[file] = "";
        }

        if (data.thumbnail !== undefined && !isEmpty(data.thumbnail)) {
            let { url, file } = pathToUrlWithFile(data.thumbnail);
            obj.thumbnail = { url };

            if (file)
                files[file] = "";
        }

        if (!isEmpty(obj))
            result.push({ ...obj, type: "rich" });
    }

    return { embeds: result, attachments: attachments(files) };
}

function pathToUrlWithFile(path: string): {
    url: string,
    file: string | null
} {
    if (path.startsWith("https://"))
        return { url: path, file: null };

    if (path.startsWith("attachment://"))
        return { url: path, file: path.split("attachment://")[1] };

    return { url: "attachment://" + path.split("/").slice(-1), file: path };
}