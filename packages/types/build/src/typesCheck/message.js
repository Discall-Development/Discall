"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSticker = exports.isEmoji = exports.isModal = exports.isMessageStickerItem = exports.isSelectOption = exports.isTextInput = exports.isSelectMenu = exports.isButton = exports.isOtherComponent = exports.isActionRow = exports.isMessageComponent = exports.isMessageInteraction = exports.isMessageReference = exports.isMessageActivity = exports.isReaction = exports.isEmbedField = exports.isEmbedAuthor = exports.isEmbedProvider = exports.isEmbedVideo = exports.isEmbedThumbnail = exports.isEmbedImage = exports.isEmbedFooter = exports.isEmbed = exports.isAttachment = exports.isMessage = void 0;
const message_1 = require("../message");
const channel_1 = require("./channel");
const guild_1 = require("./guild");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
const timestamp_1 = require("./timestamp");
const user_1 = require("./user");
function isMessage(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        channel_id: snowflake_1.isSnowflake,
        author: user_1.isUser,
        content: original_1.isString,
        timestamp: timestamp_1.isTimestamp,
        edited_timestamp: (0, original_1.isTypeNull)(timestamp_1.isTimestamp),
        tts: original_1.isBoolean,
        mention_everyone: original_1.isBoolean,
        mentions: (0, original_1.isTypeArray)(user_1.isUser),
        mention_roles: (0, original_1.isTypeArray)(guild_1.isRole),
        mention_channels: (0, original_1.isTypeArray)(channel_1.isChannelMention),
        attachments: (0, original_1.isTypeArray)(isAttachment),
        embeds: (0, original_1.isTypeArray)(isEmbed),
        reactions: (0, original_1.isTypeArray)(isReaction),
        nonce: (0, original_1.isTypeUndefined)((0, original_1.isUnion)(original_1.isNumber, original_1.isString)),
        pinned: original_1.isBoolean,
        webhook_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        type: original_1.isNumber,
        activity: (0, original_1.isTypeUndefined)(isMessageActivity),
        application: (0, original_1.isTypeUndefined)((0, original_1.isTypeObject)({
            flags: original_1.isNumber,
            id: snowflake_1.isSnowflake
        })),
        application_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        message_reference: (0, original_1.isTypeUndefined)(isMessageReference),
        flag: (0, original_1.isTypeUndefined)(original_1.isNumber),
        referenced_message: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(isMessage)),
        interaction: (0, original_1.isTypeUndefined)(isMessageInteraction),
        thread: (0, original_1.isTypeUndefined)(channel_1.isChannel),
        components: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isMessageComponent)),
        sticker_items: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isMessageStickerItem)),
        stickers: (0, original_1.isTypeUndefined)((0, original_1.isLiteral)([])),
    })(obj);
}
exports.isMessage = isMessage;
function isAttachment(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        filename: original_1.isString,
        description: (0, original_1.isTypeUndefined)(original_1.isString),
        content_type: (0, original_1.isTypeUndefined)(original_1.isString),
        size: original_1.isNumber,
        url: original_1.isString,
        proxy_url: original_1.isString,
        height: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isNumber)),
        width: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isNumber)),
        ephemral: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isAttachment = isAttachment;
function isEmbed(obj) {
    return (0, original_1.isTypeObject)({
        title: (0, original_1.isTypeUndefined)(original_1.isString),
        type: (0, original_1.isTypeUndefined)(original_1.isString),
        description: (0, original_1.isTypeUndefined)(original_1.isString),
        url: (0, original_1.isTypeUndefined)(original_1.isString),
        timestamp: (0, original_1.isTypeUndefined)(timestamp_1.isTimestamp),
        color: (0, original_1.isTypeUndefined)(original_1.isNumber),
        footer: (0, original_1.isTypeUndefined)(isEmbedFooter),
        image: (0, original_1.isTypeUndefined)(isEmbedImage),
        thumbnail: (0, original_1.isTypeUndefined)(isEmbedThumbnail),
        video: (0, original_1.isTypeUndefined)(isEmbedVideo),
        provider: (0, original_1.isTypeUndefined)(isEmbedProvider),
        author: (0, original_1.isTypeUndefined)(isEmbedAuthor),
        fields: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isEmbedField)),
    })(obj);
}
exports.isEmbed = isEmbed;
function isEmbedFooter(obj) {
    return (0, original_1.isTypeObject)({
        text: original_1.isString,
        icon_url: (0, original_1.isTypeUndefined)(original_1.isString),
        proxy_icon_url: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isEmbedFooter = isEmbedFooter;
function isEmbedImage(obj) {
    return (0, original_1.isTypeObject)({
        url: original_1.isString,
        proxy_url: (0, original_1.isTypeUndefined)(original_1.isString),
        height: (0, original_1.isTypeUndefined)(original_1.isNumber),
        width: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isEmbedImage = isEmbedImage;
function isEmbedThumbnail(obj) {
    return (0, original_1.isTypeObject)({
        url: original_1.isString,
        proxy_url: (0, original_1.isTypeUndefined)(original_1.isString),
        height: (0, original_1.isTypeUndefined)(original_1.isNumber),
        width: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isEmbedThumbnail = isEmbedThumbnail;
function isEmbedVideo(obj) {
    return (0, original_1.isTypeObject)({
        url: (0, original_1.isTypeUndefined)(original_1.isString),
        proxy_url: (0, original_1.isTypeUndefined)(original_1.isString),
        height: (0, original_1.isTypeUndefined)(original_1.isNumber),
        width: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isEmbedVideo = isEmbedVideo;
function isEmbedProvider(obj) {
    return (0, original_1.isTypeObject)({
        name: (0, original_1.isTypeUndefined)(original_1.isString),
        url: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isEmbedProvider = isEmbedProvider;
function isEmbedAuthor(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        url: (0, original_1.isTypeUndefined)(original_1.isString),
        icon_url: (0, original_1.isTypeUndefined)(original_1.isString),
        proxy_icon_url: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isEmbedAuthor = isEmbedAuthor;
function isEmbedField(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        value: original_1.isString,
        inline: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isEmbedField = isEmbedField;
function isReaction(obj) {
    return (0, original_1.isTypeObject)({
        count: original_1.isNumber,
        me: original_1.isBoolean,
        emoji: isEmoji
    })(obj);
}
exports.isReaction = isReaction;
function isMessageActivity(obj) {
    return (0, original_1.isTypeObject)({
        type: original_1.isNumber,
        party_id: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isMessageActivity = isMessageActivity;
function isMessageReference(obj) {
    return (0, original_1.isTypeObject)({
        message_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        channel_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        fail_if_not_exists: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isMessageReference = isMessageReference;
function isMessageInteraction(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        name: original_1.isString,
        user: user_1.isUser,
        member: (0, original_1.isTypeUndefined)(guild_1.isGuildMember)
    })(obj);
}
exports.isMessageInteraction = isMessageInteraction;
function isMessageComponent(obj) {
    return (0, original_1.isTypeObject)({
        content: original_1.isString,
        components: (0, original_1.isTypeArray)(isActionRow)
    })(obj);
}
exports.isMessageComponent = isMessageComponent;
function isActionRow(obj) {
    return (0, original_1.isTypeObject)({
        type: (0, original_1.isLiteral)(message_1.ComponentType.ActionRow),
        components: (0, original_1.isTypeArray)(isOtherComponent)
    })(obj);
}
exports.isActionRow = isActionRow;
function isOtherComponent(obj) {
    return isButton(obj) || isSelectMenu(obj) || isTextInput(obj);
}
exports.isOtherComponent = isOtherComponent;
function isButton(obj) {
    return (0, original_1.isTypeObject)({
        type: (0, original_1.isLiteral)(message_1.ComponentType.Button),
        style: original_1.isNumber,
        label: (0, original_1.isTypeUndefined)(original_1.isString),
        emoji: (0, original_1.isTypeUndefined)((0, original_1.isTypeObject)({
            id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
            name: (0, original_1.isTypeNull)(original_1.isString),
            animated: (0, original_1.isTypeUndefined)(original_1.isBoolean)
        })),
        custom_id: original_1.isString,
        url: (0, original_1.isTypeUndefined)(original_1.isString),
        disabled: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        row: original_1.isNumber
    })(obj);
}
exports.isButton = isButton;
function isSelectMenu(obj) {
    return (0, original_1.isTypeObject)({
        type: (0, original_1.isLiteral)(message_1.ComponentType.SelectMenu),
        custom_id: original_1.isString,
        options: (0, original_1.isTypeArray)(isSelectOption),
        placeholder: (0, original_1.isTypeUndefined)(original_1.isString),
        min_value: (0, original_1.isTypeUndefined)(original_1.isNumber),
        max_value: (0, original_1.isTypeUndefined)(original_1.isNumber),
        disabled: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        row: original_1.isNumber
    })(obj);
}
exports.isSelectMenu = isSelectMenu;
function isTextInput(obj) {
    return (0, original_1.isTypeObject)({
        type: (0, original_1.isLiteral)(message_1.ComponentType.TextInput),
        custom_id: original_1.isString,
        style: original_1.isNumber,
        label: original_1.isString,
        min_length: (0, original_1.isTypeUndefined)(original_1.isNumber),
        max_length: (0, original_1.isTypeUndefined)(original_1.isNumber),
        required: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        value: (0, original_1.isTypeUndefined)(original_1.isString),
        placeholder: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isTextInput = isTextInput;
function isSelectOption(obj) {
    return (0, original_1.isTypeObject)({
        label: original_1.isString,
        value: original_1.isString,
        description: (0, original_1.isTypeUndefined)(original_1.isString),
        emoji: (0, original_1.isTypeUndefined)((0, original_1.isTypeObject)({
            id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
            name: (0, original_1.isTypeNull)(original_1.isString),
            animated: (0, original_1.isTypeUndefined)(original_1.isBoolean)
        })),
        default: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isSelectOption = isSelectOption;
function isMessageStickerItem(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        format_type: original_1.isNumber
    })(obj);
}
exports.isMessageStickerItem = isMessageStickerItem;
function isModal(obj) {
    return (0, original_1.isTypeObject)({
        title: original_1.isString,
        custom_id: original_1.isString,
        components: (0, original_1.isTypeTuple)((0, original_1.isTypeObject)({
            type: (0, original_1.isLiteral)(message_1.ComponentType.ActionRow),
            components: (0, original_1.isTypeArray)(isTextInput)
        }))
    })(obj);
}
exports.isModal = isModal;
function isEmoji(obj) {
    return (0, original_1.isTypeObject)({
        id: (0, original_1.isTypeNull)(snowflake_1.isSnowflake),
        name: (0, original_1.isTypeNull)(original_1.isString),
        roles: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(guild_1.isRole)),
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        require_colons: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        managed: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        animated: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        available: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isEmoji = isEmoji;
function isSticker(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        pack_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        name: original_1.isString,
        description: (0, original_1.isTypeNull)(original_1.isString),
        tags: original_1.isString,
        asset: (0, original_1.isTypeUndefined)((0, original_1.isLiteral)('')),
        type: original_1.isNumber,
        format: original_1.isNumber,
        available: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        sort_value: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isSticker = isSticker;
