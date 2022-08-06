import { ApplicationFlag } from "./application";
import { ChannelMentionData, ChannelData } from "./channel";
import { RoleData, GuildMemberData } from "./guild";
import { InteractionType } from "./interaction";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
import { UserData } from "./user";

export enum DefaultMessageNotificationLevel {
    ALL_MESSAGES, ONLY_MENTIONS,
}

export interface MessageData {
    id: SnowflakeData;
    channel_id: SnowflakeData;
    author: UserData;
    content: string;
    timestamp: Timestamp;
    edited_timestamp: Timestamp | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: UserData[];
    mention_roles: RoleData[];
    mention_channels: ChannelMentionData[];
    attachments: AttachmentData[];
    embeds: EmbedData[];
    reactions: ReactionData[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: SnowflakeData;
    type: MessageType;
    activity?: MessageActivityData;
    application?: { flags: ApplicationFlag;
        id: SnowflakeData };
    application_id?: SnowflakeData;
    message_reference?: MessageReferenceData;
    flag?: MessageFlag;
    referenced_message?: MessageData | null;
    interaction?: MessageInteractionData;
    thread?: ChannelData;
    components?: MessageComponentData[];
    sticker_items?: MessageStickerItemData[];
}

export interface AttachmentData {
    id: SnowflakeData;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
}

export interface EmbedData {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: Timestamp;
    color?: number;
    footer?: EmbedFooterData;
    image?: EmbedImageData;
    thumbnail?: EmbedThumbnailData;
    video?: EmbedVideoData;
    provider?: EmbedProviderData;
    author?: EmbedAuthorData;
    fields?: EmbedFieldData[];
}

export interface EmbedFooterData {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface EmbedImageData {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface EmbedThumbnailData {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface EmbedVideoData {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface EmbedProviderData {
    name?: string;
    url?: string;
}

export interface EmbedAuthorData {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface EmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
}

export interface ReactionData {
    count: number;
    me: boolean;
    emoji: EmojiData;
}

export enum MessageType {
    DEFAULT,
    RECIPIENT_ADD,
    RECIPIENT_REMOVE,
    CALL,
    CHANNEL_NAME_CHANGE,
    CHANNEL_ICON_CHANGE,
    CHANNEL_PINNED_MESSAGE,
    GUILD_MEMBER_JOIN,
    USER_PREMIUM_GUILD_SUBSCRIPTION,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
    CHANNEL_FOLLOW_ADD,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
    THREAD_CREATED,
    REPLY,
    CHAT_INPUT_COMMAND,
    THREAD_STARTER_MESSAGE,
    GUILD_INVITE_REMINDER,
    CONTEXT_MENU_COMMAND,
}

export interface MessageActivityData {
    type: MessageActivityType;
    party_id?: string;
}

export enum MessageActivityType {
    JOIN = 1, SPECTATE, LISTEN, JOIN_REQUEST,
}

export interface MessageReferenceData {
    message_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    guild_id?: SnowflakeData;
    fail_if_not_exists?: boolean;
}

export enum MessageFlag {
    CROSSPOSTED = 1 << 0,
    IS_CROSSPOST = 1 << 1,
    SUPPRESS_EMBEDS = 1 << 2,
    SOURCE_MESSAGE_DELETED = 1 << 3,
    URGENT = 1 << 4,
    HAS_THREAD = 1 << 5,
    EPHEMERAL = 1 << 6,
    LOADING = 1 << 7,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
}

export interface MessageInteractionData {
    id: SnowflakeData;
    type: InteractionType;
    name: string;
    user: UserData;
    member?: GuildMemberData;
}

export interface MessageComponentData {
    content: string;
    components: ActionRowData[];
}

export interface ActionRowData {
    type: ComponentType.ActionRow;
    components: OtherComponentData[];
}

export type OtherComponentData = ButtonData | SelectMenuData | TextInputData;

export interface ButtonData {
    type: ComponentType.Button;
    style: ButtonStyle;
    label?: string;
    emoji?: {
        id: SnowflakeData | null;
        name: string | null;
        animated?: boolean;
    };
    custom_id: string;
    url?: string;
    disabled?: boolean;
    row: number;
}

export interface SelectMenuData {
    type: ComponentType.SelectMenu;
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
    row: number;
}

export interface TextInputData {
    type: ComponentType.TextInput;
    custom_id: string;
    style: TextInputStyle;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}

export enum ComponentType {
    ActionRow = 1, Button, SelectMenu, TextInput,
}

export enum ButtonStyle {
    Primary = 1, Secondary, Success, Danger, Link, Blurple = Primary, Grey, Green, Red, URL,
}

export interface SelectOption {
    label: string;
    value: string;
    description?: string;
    emoji?: {
        id: SnowflakeData | null;
        name: string | null;
        animated?: boolean;
    };
    default?: boolean;
}

export enum TextInputStyle {
    Short = 1, Paragraph,
}

export interface MessageStickerItemData {
    id: SnowflakeData;
    name: string;
    format_type: StickerFormatTypes;
}


export interface ModalData {
    title: string;
    custom_id: string;
    components: [{
        type: ComponentType.ActionRow;
        components: TextInputData[];
    }];
}

export interface EmojiData {
    id: SnowflakeData | null;
    name: string | null;
    roles?: RoleData[];
    user?: UserData;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export interface StickerData {
    id: SnowflakeData;
    pack_id?: SnowflakeData;
    name: string;
    description: string | null;
    tags: string;
    asset?: "";
    type: StickerTypes;
    format: StickerFormatTypes;
    available?: boolean;
    guild_id?: SnowflakeData;
    user?: UserData;
    sort_value?: number;
}

export enum StickerTypes {
    STANDARD = 1, GUILD,
}

export enum StickerFormatTypes {
    PNG = 1, APNG, LOTTIE,
}