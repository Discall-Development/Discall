import {AttachmentData, EmbedData, SnowflakeData} from "./dataType";

export function createMessage(channel_id: SnowflakeData) {
    return function({
        content,
        embeds,
        sticker_ids,
        attachments
    }: {
        content?: string;
        embeds?: EmbedData[];
        sticker_ids?: SnowflakeData[];
        attachments?: Partial<AttachmentData>[];
    }) {
        return {
            uri: (base: URL) => {
                base.pathname += `/channels/${channel_id}/messages`;
                return {
                    uri: base.toString(),
                    mode: 'POST'
                };
            },
            data: {
                content,
                embeds,
                sticker_ids,
                attachments
            }
        };
    };
}

type FileName = string;
type Description = string;
export function createAttachments(files: Record<FileName, Description>): Partial<AttachmentData>[] {
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