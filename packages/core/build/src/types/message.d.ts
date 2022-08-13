import { ApplicationFlag } from "./application";
import { ChannelMentionData, ChannelData } from "./channel";
import { RoleData, GuildMemberData } from "./guild";
import { InteractionType } from "./interaction";
import { SnowflakeData } from "./snowflake";
import { Timestamp } from "./timestamp";
import { UserData } from "./user";
export declare enum DefaultMessageNotificationLevel {
    ALL_MESSAGES = 0,
    ONLY_MENTIONS = 1
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
    application?: {
        flags: ApplicationFlag;
        id: SnowflakeData;
    };
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
export declare enum MessageType {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23
}
export interface MessageActivityData {
    type: MessageActivityType;
    party_id?: string;
}
export declare enum MessageActivityType {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 4
}
export interface MessageReferenceData {
    message_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    guild_id?: SnowflakeData;
    fail_if_not_exists?: boolean;
}
export declare enum MessageFlag {
    CROSSPOSTED = 1,
    IS_CROSSPOST = 2,
    SUPPRESS_EMBEDS = 4,
    SOURCE_MESSAGE_DELETED = 8,
    URGENT = 16,
    HAS_THREAD = 32,
    EPHEMERAL = 64,
    LOADING = 128,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 256
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
export declare type OtherComponentData = ButtonData | SelectMenuData | TextInputData;
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
export declare enum ComponentType {
    ActionRow = 1,
    Button = 2,
    SelectMenu = 3,
    TextInput = 4
}
export declare enum ButtonStyle {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5,
    Blurple = 1,
    Grey = 2,
    Green = 3,
    Red = 4,
    URL = 5
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
export declare enum TextInputStyle {
    Short = 1,
    Paragraph = 2
}
export interface MessageStickerItemData {
    id: SnowflakeData;
    name: string;
    format_type: StickerFormatTypes;
}
export interface ModalData {
    title: string;
    custom_id: string;
    components: [
        {
            type: ComponentType.ActionRow;
            components: TextInputData[];
        }
    ];
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
export declare enum StickerTypes {
    STANDARD = 1,
    GUILD = 2
}
export declare enum StickerFormatTypes {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3
}
