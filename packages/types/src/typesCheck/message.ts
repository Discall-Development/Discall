import { ActionRowData, AttachmentData, ButtonData, ComponentType, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, EmbedImageData, EmbedProviderData, EmbedThumbnailData, EmbedVideoData, EmojiData, MessageActivityData, MessageComponentData, MessageData, MessageInteractionData, MessageReferenceData, MessageStickerItemData, ModalData, OtherComponentData, ReactionData, SelectMenuData, SelectOption, StickerData, TextInputData } from "../message";
import { isChannel, isChannelMention } from "./channel";
import { isRole } from "./guild";
import { isBoolean, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeUndefined, isUnion } from "./original";
import { isSnowflake } from "./snowflake";
import { isTimestamp } from "./timestamp";
import { isUser } from "./user";

export function isMessage(obj: any): obj is MessageData {
    return isTypeObject({
        id: isSnowflake,
        channel_id: isSnowflake,
        author: isUser,
        content: isString,
        timestamp: isTimestamp,
        edited_timestamp: isTypeNull(isTimestamp),
        tts: isBoolean,
        mention_everyone: isBoolean,
        mentions: isTypeArray(isUser),
        mention_roles: isTypeArray(isRole),
        mention_channels: isTypeArray(isChannelMention),
        attachments: isTypeArray(isAttachment),
        embeds: isTypeArray(isEmbed),
        reactions: isTypeArray(isReaction),
        nonce: isTypeUndefined(isUnion(isNumber, isString)),
        pinned: isBoolean,
        webhook_id: isTypeUndefined(isSnowflake),
        type: isNumber,
        activity: isTypeUndefined(isMessageActivity),
        application: isTypeUndefined(isTypeObject({
            flags: isNumber,
            id: isSnowflake
        })),
        application_id: isTypeUndefined(isSnowflake),
        message_reference: isTypeUndefined(isMessageReference),
        flag: isTypeUndefined(isNumber),
        referenced_message: isTypeUndefined(isTypeNull(isMessage)),
        interaction: isTypeUndefined(isMessageInteraction),
        thread: isTypeUndefined(isChannel),
        components: isTypeUndefined(isTypeArray(isMessageComponent)),
        sticker_items: isTypeUndefined(isTypeArray(isMessageStickerItem)),
        stickers: isTypeUndefined(isLiteral([])),
    })(obj);
}

export function isAttachment(obj: any): obj is AttachmentData {
    let keys: (keyof AttachmentData)[] = ["id", "filename", "description", "content_type", "size", "url", "proxy_url", "height", "width", "ephemeral"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbed(obj: any): obj is EmbedData {
    let keys: (keyof EmbedData)[] = ["title", "type", "description", "url", "timestamp", "color", "footer", "image", "thumbnail", "video", "provider", "author", "fields"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedFooter(obj: any): obj is EmbedFooterData {
    let keys: (keyof EmbedFooterData)[] = ["text", "icon_url", "proxy_icon_url"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedImage(obj: any): obj is EmbedImageData {
    let keys: (keyof EmbedImageData)[] = ["url", "proxy_url", "height", "width"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedThumbnail(obj: any): obj is EmbedThumbnailData {
    let keys: (keyof EmbedThumbnailData)[] = ["url", "proxy_url", "height", "width"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedVideo(obj: any): obj is EmbedVideoData {
    let keys: (keyof EmbedVideoData)[] = ["url", "proxy_url", "height", "width"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedProvider(obj: any): obj is EmbedProviderData {
    let keys: (keyof EmbedProviderData)[] = ["name", "url"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedAuthor(obj: any): obj is EmbedAuthorData {
    let keys: (keyof EmbedAuthorData)[] = ["name", "url", "icon_url", "proxy_icon_url"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmbedField(obj: any): obj is EmbedFieldData {
    let keys: (keyof EmbedFieldData)[] = ["name", "value", "inline"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isReaction(obj: any): obj is ReactionData {
    let keys: (keyof ReactionData)[] = ["count", "me", "emoji"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isMessageActivity(obj: any): obj is MessageActivityData {
    let keys: (keyof MessageActivityData)[] = ["type", "party_id"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isMessageReference(obj: any): obj is MessageReferenceData {
    let keys: (keyof MessageReferenceData)[] = ["message_id", "channel_id", "guild_id", "fail_if_not_exists"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isMessageInteraction(obj: any): obj is MessageInteractionData {
    let keys: (keyof MessageInteractionData)[] = ["id", "type", "name", "user", "member"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isMessageComponent(obj: any): obj is MessageComponentData {
    let keys: (keyof MessageComponentData)[] = ["content", "components"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isActionRow(obj: any): obj is ActionRowData {
    let keys: (keyof ActionRowData)[] = ["type", "components"];
    return Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
}

export function isOtherComponent(obj: any): obj is OtherComponentData {
    return isButton(obj) || isSelectMenu(obj) || isTextInput(obj);
}

export function isButton(obj: any): obj is ButtonData {
    let keys: (keyof ButtonData)[] = ["type", "style", "label", "emoji", "custom_id", "url", "disabled", "row"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isSelectMenu(obj: any): obj is SelectMenuData {
    let keys: (keyof SelectMenuData)[] = ["type", "custom_id", "options", "placeholder", "min_values", "max_values", "disabled", "row"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isTextInput(obj: any): obj is TextInputData {
    let keys: (keyof TextInputData)[] = ["type", "custom_id", "style", "label", "min_length", "max_length", "required", "value", "placeholder"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isSelectOption(obj: any): obj is SelectOption {
    let keys: (keyof SelectOption)[] = ["label", "value", "description", "emoji", "default"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isMessageStickerItem(obj: any): obj is MessageStickerItemData {
    let keys: (keyof MessageStickerItemData)[] = ["id", "name", "format_type"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}


export function isModal(obj: any): obj is ModalData {
    let keys: (keyof ModalData)[] = ["title", "custom_id", "components"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isEmoji(obj: any): obj is EmojiData {
    let keys: (keyof EmojiData)[] = ["id", "name", "roles", "user", "require_colons", "managed", "animated", "available"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}

export function isSticker(obj: any): obj is StickerData {
    let keys: (keyof StickerData)[] = ["id", "pack_id", "name", "description", "tags", "asset", "type", "format", "available", "guild_id", "user", "sort_value"];
    let neccessary: (keyof ActivityEmoji)[] = ["name"];
    let optional: (keyof ActivityEmoji)[] = ["id", "animated"];

    let types_1: ((v: any) => boolean)[] = [isString];
    let types_2: ((v: any) => boolean)[] = [isSnowflake, isBoolean];

    let keys: (keyof ActivityEmoji)[] = neccessary.concat(optional);
    let result = Object.keys(obj).filter((v: any) => !keys.includes(v)).length === 0;
    if (!result || !neccessary.every((v, idx) => {
        return obj[v] && types_1[idx](obj[v]);
    }))
        return false;

    if (!result || !optional.every((v, idx) => {
        if (!obj[v])
            return true;

        return types_2[idx](v);
    }))
        return false;

    return true;
}