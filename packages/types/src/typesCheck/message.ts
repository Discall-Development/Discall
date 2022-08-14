import { ActionRowData, AttachmentData, ButtonData, ComponentType, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, EmbedImageData, EmbedProviderData, EmbedThumbnailData, EmbedVideoData, EmojiData, MessageActivityData, MessageComponentData, MessageData, MessageInteractionData, MessageReferenceData, MessageStickerItemData, ModalData, OtherComponentData, ReactionData, SelectMenuData, SelectOption, StickerData, TextInputData } from '../message';
import { isChannel, isChannelMention } from './channel';
import { isGuildMember, isRole } from './guild';
import { isBoolean, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeTuple, isTypeUndefined, isUnion } from './original';
import { isSnowflake } from './snowflake';
import { isTimestamp } from './timestamp';
import { isUser } from './user';

export function isMessage(obj: unknown): obj is MessageData {
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

export function isAttachment(obj: unknown): obj is AttachmentData {
    return isTypeObject({
        id: isSnowflake,
        filename: isString,
        description: isTypeUndefined(isString),
        content_type: isTypeUndefined(isString),
        size: isNumber,
        url: isString,
        proxy_url: isString,
        height: isTypeUndefined(isTypeNull(isNumber)),
        width: isTypeUndefined(isTypeNull(isNumber)),
        ephemral: isTypeUndefined(isBoolean)
    })(obj);
}

export function isEmbed(obj: unknown): obj is EmbedData {
    return isTypeObject({
        title: isTypeUndefined(isString),
        type: isTypeUndefined(isString),
        description: isTypeUndefined(isString),
        url: isTypeUndefined(isString),
        timestamp: isTypeUndefined(isTimestamp),
        color: isTypeUndefined(isNumber),
        footer: isTypeUndefined(isEmbedFooter),
        image: isTypeUndefined(isEmbedImage),
        thumbnail: isTypeUndefined(isEmbedThumbnail),
        video: isTypeUndefined(isEmbedVideo),
        provider: isTypeUndefined(isEmbedProvider),
        author: isTypeUndefined(isEmbedAuthor),
        fields: isTypeUndefined(isTypeArray(isEmbedField)),
    })(obj);
}

export function isEmbedFooter(obj: unknown): obj is EmbedFooterData {
    return isTypeObject({
        text: isString,
        icon_url: isTypeUndefined(isString),
        proxy_icon_url: isTypeUndefined(isString)
    })(obj);
}

export function isEmbedImage(obj: unknown): obj is EmbedImageData {
    return isTypeObject({
        url: isString,
        proxy_url: isTypeUndefined(isString),
        height: isTypeUndefined(isNumber),
        width: isTypeUndefined(isNumber)
    })(obj);
}

export function isEmbedThumbnail(obj: unknown): obj is EmbedThumbnailData {
    return isTypeObject({
        url: isString,
        proxy_url: isTypeUndefined(isString),
        height: isTypeUndefined(isNumber),
        width: isTypeUndefined(isNumber)
    })(obj);
}

export function isEmbedVideo(obj: unknown): obj is EmbedVideoData {
    return isTypeObject({
        url: isTypeUndefined(isString),
        proxy_url: isTypeUndefined(isString),
        height: isTypeUndefined(isNumber),
        width: isTypeUndefined(isNumber)
    })(obj);
}

export function isEmbedProvider(obj: unknown): obj is EmbedProviderData {
    return isTypeObject({
        name: isTypeUndefined(isString),
        url: isTypeUndefined(isString)
    })(obj);
}

export function isEmbedAuthor(obj: unknown): obj is EmbedAuthorData {
    return isTypeObject({
        name: isString,
        url: isTypeUndefined(isString),
        icon_url: isTypeUndefined(isString),
        proxy_icon_url: isTypeUndefined(isString)
    })(obj);
}

export function isEmbedField(obj: unknown): obj is EmbedFieldData {
    return isTypeObject({
        name: isString,
        value: isString,
        inline: isTypeUndefined(isBoolean)
    })(obj);
}

export function isReaction(obj: unknown): obj is ReactionData {
    return isTypeObject({
        count: isNumber,
        me: isBoolean,
        emoji: isEmoji
    })(obj);
}

export function isMessageActivity(obj: unknown): obj is MessageActivityData {
    return isTypeObject({
        type: isNumber,
        party_id: isTypeUndefined(isString)
    })(obj);
}

export function isMessageReference(obj: unknown): obj is MessageReferenceData {
    return isTypeObject({
        message_id: isTypeUndefined(isSnowflake),
        channel_id: isTypeUndefined(isSnowflake),
        guild_id: isTypeUndefined(isSnowflake),
        fail_if_not_exists: isTypeUndefined(isBoolean)
    })(obj);
}

export function isMessageInteraction(obj: unknown): obj is MessageInteractionData {
    return isTypeObject({
        id: isSnowflake,
        type: isNumber,
        name: isString,
        user: isUser,
        member: isTypeUndefined(isGuildMember)
    })(obj);
}

export function isMessageComponent(obj: unknown): obj is MessageComponentData {
    return isTypeObject({
        content: isString,
        components: isTypeArray(isActionRow)
    })(obj);
}

export function isActionRow(obj: unknown): obj is ActionRowData {
    return isTypeObject({
        type: isLiteral(ComponentType.ActionRow),
        components: isTypeArray(isOtherComponent)
    })(obj);
}

export function isOtherComponent(obj: unknown): obj is OtherComponentData {
    return isButton(obj) || isSelectMenu(obj) || isTextInput(obj);
}

export function isButton(obj: unknown): obj is ButtonData {
    return isTypeObject({
        type: isLiteral(ComponentType.Button),
        style: isNumber,
        label: isTypeUndefined(isString),
        emoji: isTypeUndefined(isTypeObject({
            id: isTypeNull(isSnowflake),
            name: isTypeNull(isString),
            animated: isTypeUndefined(isBoolean)
        })),
        custom_id: isString,
        url: isTypeUndefined(isString),
        disabled: isTypeUndefined(isBoolean),
        row: isNumber
    })(obj);
}

export function isSelectMenu(obj: unknown): obj is SelectMenuData {
    return isTypeObject({
        type: isLiteral(ComponentType.SelectMenu),
        custom_id: isString,
        options: isTypeArray(isSelectOption),
        placeholder: isTypeUndefined(isString),
        min_value: isTypeUndefined(isNumber),
        max_value: isTypeUndefined(isNumber),
        disabled: isTypeUndefined(isBoolean),
        row: isNumber
    })(obj);
}

export function isTextInput(obj: unknown): obj is TextInputData {
    return isTypeObject({
        type: isLiteral(ComponentType.TextInput),
        custom_id: isString,
        style: isNumber,
        label: isString,
        min_length: isTypeUndefined(isNumber),
        max_length: isTypeUndefined(isNumber),
        required: isTypeUndefined(isBoolean),
        value: isTypeUndefined(isString),
        placeholder: isTypeUndefined(isString)
    })(obj);
}

export function isSelectOption(obj: unknown): obj is SelectOption {
    return isTypeObject({
        label: isString,
        value: isString,
        description: isTypeUndefined(isString),
        emoji: isTypeUndefined(isTypeObject({
            id: isTypeNull(isSnowflake),
            name: isTypeNull(isString),
            animated: isTypeUndefined(isBoolean)
        })),
        default: isTypeUndefined(isBoolean)
    })(obj);
}

export function isMessageStickerItem(obj: unknown): obj is MessageStickerItemData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        format_type: isNumber
    })(obj);
}


export function isModal(obj: unknown): obj is ModalData {
    return isTypeObject({
        title: isString,
        custom_id: isString,
        components: isTypeTuple(isTypeObject({
            type: isLiteral(ComponentType.ActionRow),
            components: isTypeArray(isTextInput)
        }))
    })(obj);
}

export function isEmoji(obj: unknown): obj is EmojiData {
    return isTypeObject({
        id: isTypeNull(isSnowflake),
        name: isTypeNull(isString),
        roles: isTypeUndefined(isTypeArray(isRole)),
        user: isTypeUndefined(isUser),
        require_colons: isTypeUndefined(isBoolean),
        managed: isTypeUndefined(isBoolean),
        animated: isTypeUndefined(isBoolean),
        available: isTypeUndefined(isBoolean)
    })(obj);
}

export function isSticker(obj: unknown): obj is StickerData {
    return isTypeObject({
        id: isSnowflake,
        pack_id: isTypeUndefined(isSnowflake),
        name: isString,
        description: isTypeNull(isString),
        tags: isString,
        asset: isTypeUndefined(isLiteral('')),
        type: isNumber,
        format: isNumber,
        available: isTypeUndefined(isBoolean),
        guild_id: isTypeUndefined(isSnowflake),
        user: isTypeUndefined(isUser),
        sort_value: isTypeUndefined(isNumber)
    })(obj);
}