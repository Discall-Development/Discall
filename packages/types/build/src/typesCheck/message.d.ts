import { ActionRowData, AttachmentData, ButtonData, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, EmbedImageData, EmbedProviderData, EmbedThumbnailData, EmbedVideoData, EmojiData, MessageActivityData, MessageComponentData, MessageData, MessageInteractionData, MessageReferenceData, MessageStickerItemData, ModalData, OtherComponentData, ReactionData, SelectMenuData, SelectOption, StickerData, TextInputData } from "../message";
export declare function isMessage(obj: any): obj is MessageData;
export declare function isAttachment(obj: any): obj is AttachmentData;
export declare function isEmbed(obj: any): obj is EmbedData;
export declare function isEmbedFooter(obj: any): obj is EmbedFooterData;
export declare function isEmbedImage(obj: any): obj is EmbedImageData;
export declare function isEmbedThumbnail(obj: any): obj is EmbedThumbnailData;
export declare function isEmbedVideo(obj: any): obj is EmbedVideoData;
export declare function isEmbedProvider(obj: any): obj is EmbedProviderData;
export declare function isEmbedAuthor(obj: any): obj is EmbedAuthorData;
export declare function isEmbedField(obj: any): obj is EmbedFieldData;
export declare function isReaction(obj: any): obj is ReactionData;
export declare function isMessageActivity(obj: any): obj is MessageActivityData;
export declare function isMessageReference(obj: any): obj is MessageReferenceData;
export declare function isMessageInteraction(obj: any): obj is MessageInteractionData;
export declare function isMessageComponent(obj: any): obj is MessageComponentData;
export declare function isActionRow(obj: any): obj is ActionRowData;
export declare function isOtherComponent(obj: any): obj is OtherComponentData;
export declare function isButton(obj: any): obj is ButtonData;
export declare function isSelectMenu(obj: any): obj is SelectMenuData;
export declare function isTextInput(obj: any): obj is TextInputData;
export declare function isSelectOption(obj: any): obj is SelectOption;
export declare function isMessageStickerItem(obj: any): obj is MessageStickerItemData;
export declare function isModal(obj: any): obj is ModalData;
export declare function isEmoji(obj: any): obj is EmojiData;
export declare function isSticker(obj: any): obj is StickerData;
