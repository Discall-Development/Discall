import { ActionRowData, AttachmentData, ButtonData, ComponentType, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, EmbedImageData, EmbedProviderData, EmbedThumbnailData, EmbedVideoData, EmojiData, MessageActivityData, MessageComponentData, MessageData, MessageInteractionData, MessageReferenceData, MessageStickerItemData, ModalData, OtherComponentData, ReactionData, SelectMenuData, SelectOption, StickerData, TextInputData } from "../types/message";
import { isActivityButtons } from "./user";

export function isMessage(obj: any): obj is MessageData {
    let keys: (keyof MessageData)[] = ["id", "channel_id", "author", "content", "timestamp", "edited_timestamp", "tts", "mention_everyone", "mentions", "mention_roles", "mention_channels", "attachments", "embeds", "reactions", "nonce", "pinned", "webhook_id", "type", "activity", "application", "application_id", "message_reference", "flag", "referenced_message", "interaction", "thread", "components", "sticker_items"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isAttachment(obj: any): obj is AttachmentData {
    let keys: (keyof AttachmentData)[] = ["id", "filename", "description", "content_type", "size", "url", "proxy_url", "height", "width", "ephemeral"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbed(obj: any): obj is EmbedData {
    let keys: (keyof EmbedData)[] = ["title", "type", "description", "url", "timestamp", "color", "footer", "image", "thumbnail", "video", "provider", "author", "fields"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedFooter(obj: any): obj is EmbedFooterData {
    let keys: (keyof EmbedFooterData)[] = ["text", "icon_url", "proxy_icon_url"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedImage(obj: any): obj is EmbedImageData {
    let keys: (keyof EmbedImageData)[] = ["url", "proxy_url", "height", "width"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedThumbnail(obj: any): obj is EmbedThumbnailData {
    let keys: (keyof EmbedThumbnailData)[] = ["url", "proxy_url", "height", "width"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedVideo(obj: any): obj is EmbedVideoData {
    let keys: (keyof EmbedVideoData)[] = ["url", "proxy_url", "height", "width"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedProvider(obj: any): obj is EmbedProviderData {
    let keys: (keyof EmbedProviderData)[] = ["name", "url"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedAuthor(obj: any): obj is EmbedAuthorData {
    let keys: (keyof EmbedAuthorData)[] = ["name", "url", "icon_url", "proxy_icon_url"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmbedField(obj: any): obj is EmbedFieldData {
    let keys: (keyof EmbedFieldData)[] = ["name", "value", "inline"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isReaction(obj: any): obj is ReactionData {
    let keys: (keyof ReactionData)[] = ["count", "me", "emoji"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isMessageActivity(obj: any): obj is MessageActivityData {
    let keys: (keyof MessageActivityData)[] = ["type", "party_id"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isMessageReference(obj: any): obj is MessageReferenceData {
    let keys: (keyof MessageReferenceData)[] = ["message_id", "channel_id", "guild_id", "fail_if_not_exists"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isMessageInteraction(obj: any): obj is MessageInteractionData {
    let keys: (keyof MessageInteractionData)[] = ["id", "type", "name", "user", "member"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isMessageComponent(obj: any): obj is MessageComponentData {
    let keys: (keyof MessageComponentData)[] = ["content", "components"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isActionRow(obj: any): obj is ActionRowData {
    let keys: (keyof ActionRowData)[] = ["type", "components"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isOtherComponent(obj: any): obj is OtherComponentData {
    return isButton(obj) || isSelectMenu(obj) || isTextInput(obj);
}

export function isButton(obj: any): obj is ButtonData {
    let keys: (keyof ButtonData)[] = ["type", "style", "label", "emoji", "custom_id", "url", "disabled", "row"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v)) && obj.type === ComponentType.Button;
}

export function isSelectMenu(obj: any): obj is SelectMenuData {
    let keys: (keyof SelectMenuData)[] = ["type", "custom_id", "options", "placeholder", "min_values", "max_values", "disabled", "row"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v)) && obj.type === ComponentType.SelectMenu;
}

export function isTextInput(obj: any): obj is TextInputData {
    let keys: (keyof TextInputData)[] = ["type", "custom_id", "style", "label", "min_length", "max_length", "required", "value", "placeholder"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v)) && obj.type === ComponentType.TextInput;
}

export function isSelectOption(obj: any): obj is SelectOption {
    let keys: (keyof SelectOption)[] = ["label", "value", "description", "emoji", "default"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isMessageStickerItem(obj: any): obj is MessageStickerItemData {
    let keys: (keyof MessageStickerItemData)[] = ["id", "name", "format_type"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}


export function isModal(obj: any): obj is ModalData {
    let keys: (keyof ModalData)[] = ["title", "custom_id", "components"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isEmoji(obj: any): obj is EmojiData {
    let keys: (keyof EmojiData)[] = ["id", "name", "roles", "user", "require_colons", "managed", "animated", "available"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isSticker(obj: any): obj is StickerData {
    let keys: (keyof StickerData)[] = ["id", "pack_id", "name", "description", "tags", "asset", "type", "format", "available", "guild_id", "user", "sort_value"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}