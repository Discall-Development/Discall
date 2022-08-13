"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerFormatTypes = exports.StickerTypes = exports.TextInputStyle = exports.ButtonStyle = exports.ComponentType = exports.MessageFlag = exports.MessageActivityType = exports.MessageType = exports.DefaultMessageNotificationLevel = void 0;
var DefaultMessageNotificationLevel;
(function (DefaultMessageNotificationLevel) {
    DefaultMessageNotificationLevel[DefaultMessageNotificationLevel["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    DefaultMessageNotificationLevel[DefaultMessageNotificationLevel["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
})(DefaultMessageNotificationLevel = exports.DefaultMessageNotificationLevel || (exports.DefaultMessageNotificationLevel = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["DEFAULT"] = 0] = "DEFAULT";
    MessageType[MessageType["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    MessageType[MessageType["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    MessageType[MessageType["CALL"] = 3] = "CALL";
    MessageType[MessageType["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    MessageType[MessageType["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    MessageType[MessageType["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    MessageType[MessageType["GUILD_MEMBER_JOIN"] = 7] = "GUILD_MEMBER_JOIN";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION"] = 8] = "USER_PREMIUM_GUILD_SUBSCRIPTION";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1"] = 9] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2"] = 10] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2";
    MessageType[MessageType["USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3"] = 11] = "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3";
    MessageType[MessageType["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    MessageType[MessageType["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    MessageType[MessageType["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    MessageType[MessageType["REPLY"] = 19] = "REPLY";
    MessageType[MessageType["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    MessageType[MessageType["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    MessageType[MessageType["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    MessageType[MessageType["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageActivityType;
(function (MessageActivityType) {
    MessageActivityType[MessageActivityType["JOIN"] = 1] = "JOIN";
    MessageActivityType[MessageActivityType["SPECTATE"] = 2] = "SPECTATE";
    MessageActivityType[MessageActivityType["LISTEN"] = 3] = "LISTEN";
    MessageActivityType[MessageActivityType["JOIN_REQUEST"] = 4] = "JOIN_REQUEST";
})(MessageActivityType = exports.MessageActivityType || (exports.MessageActivityType = {}));
var MessageFlag;
(function (MessageFlag) {
    MessageFlag[MessageFlag["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    MessageFlag[MessageFlag["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    MessageFlag[MessageFlag["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    MessageFlag[MessageFlag["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    MessageFlag[MessageFlag["URGENT"] = 16] = "URGENT";
    MessageFlag[MessageFlag["HAS_THREAD"] = 32] = "HAS_THREAD";
    MessageFlag[MessageFlag["EPHEMERAL"] = 64] = "EPHEMERAL";
    MessageFlag[MessageFlag["LOADING"] = 128] = "LOADING";
    MessageFlag[MessageFlag["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
})(MessageFlag = exports.MessageFlag || (exports.MessageFlag = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    ComponentType[ComponentType["Button"] = 2] = "Button";
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
    ButtonStyle[ButtonStyle["Blurple"] = 1] = "Blurple";
    ButtonStyle[ButtonStyle["Grey"] = 2] = "Grey";
    ButtonStyle[ButtonStyle["Green"] = 3] = "Green";
    ButtonStyle[ButtonStyle["Red"] = 4] = "Red";
    ButtonStyle[ButtonStyle["URL"] = 5] = "URL";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
var TextInputStyle;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle = exports.TextInputStyle || (exports.TextInputStyle = {}));
var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes = exports.StickerTypes || (exports.StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
})(StickerFormatTypes = exports.StickerFormatTypes || (exports.StickerFormatTypes = {}));
