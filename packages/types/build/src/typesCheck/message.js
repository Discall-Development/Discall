"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSticker = exports.isEmoji = exports.isModal = exports.isMessageStickerItem = exports.isSelectOption = exports.isTextInput = exports.isSelectMenu = exports.isButton = exports.isOtherComponent = exports.isActionRow = exports.isMessageComponent = exports.isMessageInteraction = exports.isMessageReference = exports.isMessageActivity = exports.isReaction = exports.isEmbedField = exports.isEmbedAuthor = exports.isEmbedProvider = exports.isEmbedVideo = exports.isEmbedThumbnail = exports.isEmbedImage = exports.isEmbedFooter = exports.isEmbed = exports.isAttachment = exports.isMessage = void 0;
const message_1 = require("../message");
function isMessage(obj) {
    let keys = ["id", "channel_id", "author", "content", "timestamp", "edited_timestamp", "tts", "mention_everyone", "mentions", "mention_roles", "mention_channels", "attachments", "embeds", "reactions", "nonce", "pinned", "webhook_id", "type", "activity", "application", "application_id", "message_reference", "flag", "referenced_message", "interaction", "thread", "components", "sticker_items"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessage = isMessage;
function isAttachment(obj) {
    let keys = ["id", "filename", "description", "content_type", "size", "url", "proxy_url", "height", "width", "ephemeral"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isAttachment = isAttachment;
function isEmbed(obj) {
    let keys = ["title", "type", "description", "url", "timestamp", "color", "footer", "image", "thumbnail", "video", "provider", "author", "fields"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbed = isEmbed;
function isEmbedFooter(obj) {
    let keys = ["text", "icon_url", "proxy_icon_url"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedFooter = isEmbedFooter;
function isEmbedImage(obj) {
    let keys = ["url", "proxy_url", "height", "width"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedImage = isEmbedImage;
function isEmbedThumbnail(obj) {
    let keys = ["url", "proxy_url", "height", "width"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedThumbnail = isEmbedThumbnail;
function isEmbedVideo(obj) {
    let keys = ["url", "proxy_url", "height", "width"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedVideo = isEmbedVideo;
function isEmbedProvider(obj) {
    let keys = ["name", "url"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedProvider = isEmbedProvider;
function isEmbedAuthor(obj) {
    let keys = ["name", "url", "icon_url", "proxy_icon_url"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedAuthor = isEmbedAuthor;
function isEmbedField(obj) {
    let keys = ["name", "value", "inline"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmbedField = isEmbedField;
function isReaction(obj) {
    let keys = ["count", "me", "emoji"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isReaction = isReaction;
function isMessageActivity(obj) {
    let keys = ["type", "party_id"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessageActivity = isMessageActivity;
function isMessageReference(obj) {
    let keys = ["message_id", "channel_id", "guild_id", "fail_if_not_exists"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessageReference = isMessageReference;
function isMessageInteraction(obj) {
    let keys = ["id", "type", "name", "user", "member"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessageInteraction = isMessageInteraction;
function isMessageComponent(obj) {
    let keys = ["content", "components"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessageComponent = isMessageComponent;
function isActionRow(obj) {
    let keys = ["type", "components"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isActionRow = isActionRow;
function isOtherComponent(obj) {
    return isButton(obj) || isSelectMenu(obj) || isTextInput(obj);
}
exports.isOtherComponent = isOtherComponent;
function isButton(obj) {
    let keys = ["type", "style", "label", "emoji", "custom_id", "url", "disabled", "row"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0 && obj.type === message_1.ComponentType.Button;
}
exports.isButton = isButton;
function isSelectMenu(obj) {
    let keys = ["type", "custom_id", "options", "placeholder", "min_values", "max_values", "disabled", "row"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0 && obj.type === message_1.ComponentType.SelectMenu;
}
exports.isSelectMenu = isSelectMenu;
function isTextInput(obj) {
    let keys = ["type", "custom_id", "style", "label", "min_length", "max_length", "required", "value", "placeholder"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0 && obj.type === message_1.ComponentType.TextInput;
}
exports.isTextInput = isTextInput;
function isSelectOption(obj) {
    let keys = ["label", "value", "description", "emoji", "default"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isSelectOption = isSelectOption;
function isMessageStickerItem(obj) {
    let keys = ["id", "name", "format_type"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isMessageStickerItem = isMessageStickerItem;
function isModal(obj) {
    let keys = ["title", "custom_id", "components"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isModal = isModal;
function isEmoji(obj) {
    let keys = ["id", "name", "roles", "user", "require_colons", "managed", "animated", "available"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isEmoji = isEmoji;
function isSticker(obj) {
    let keys = ["id", "pack_id", "name", "description", "tags", "asset", "type", "format", "available", "guild_id", "user", "sort_value"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isSticker = isSticker;
