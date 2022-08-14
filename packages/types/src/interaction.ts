import { ChannelData, ChannelTypes, LocaleOption } from './channel';
import { GuildMemberData, RoleData } from './guild';
import { AttachmentData, ComponentType, MessageComponentData, MessageData, MessageInteractionData, SelectOption } from './message';
import { SnowflakeData } from './snowflake';
import { UserData } from './user';

export enum InteractionType {
    PING = 1, APPLICATION_COMMAND, MESSAGE_COMPONENT, APPLICATION_COMMAND_AUTOCOMPLETE, MODAL_SUBMIT,
}

export interface InteractionData {
    id: SnowflakeData;
    application_id: SnowflakeData;
    type: InteractionType;
    data?: IApplicationCommandData | IMessageComponentData | IModalSubmitData;
    guild_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    member?: GuildMemberData;
    user?: UserData;
    token: string;
    version: 1;
    message: MessageData | MessageInteractionData;
    locale?: LocaleOption;
    guild_locale?: LocaleOption;
}

export interface IApplicationCommandData {
    id: SnowflakeData;
    name: string;
    type: InteractionType;
    resolved?: ResolveData;
    options?: ApplicationCommandInteractionDataOptionData[];
    guild_id?: SnowflakeData;
    target_id?: SnowflakeData;
}

export interface IMessageComponentData {
    custom_id: string;
    component_type: ComponentType;
    values?: SelectOption[];
}

export interface IModalSubmitData {
    custom_id: string;
    components: MessageComponentData[];
}

export interface ResolveData {
    users?: Record<SnowflakeData, UserData>;
    members?: Record<SnowflakeData, GuildMemberData>;
    roles?: Record<SnowflakeData, RoleData>;
    channels?: Record<SnowflakeData, ChannelData>;
    messages?: Record<SnowflakeData, MessageData>;
    attachments?: Record<SnowflakeData, AttachmentData>;
}

export interface ApplicationCommandInteractionDataOptionData {
    name: string;
    type: ApplicationCommandOptionType;
    value?: number | string;
    options?: ApplicationCommandInteractionDataOptionData[];
    focused?: boolean;
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1, SUB_COMMAND_GROUP, STRING, INTEGER, BOOLEAN, USER, CHANNEL, ROLE, MENTIONABLE, NUMBER, ATTACHMENT,
}

export interface ApplicationCommandData {
    id: SnowflakeData;
    type?: ApplicationCommandType;
    application_id: SnowflakeData;
    guild_id?: SnowflakeData;
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    description: string;
    description_localizations?: {
        [k: string]: string;
    } | null;
    options?: ApplicationCommandOptionData[];
    default_member_permissions: string | null;
    dm_permission?: boolean;
    default_permission?: boolean | null;
    version: SnowflakeData;
}

export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER,
    MESSAGE
}

export interface ApplicationCommandOptionData {
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    description: string;
    description_localizations?: {
        [k: string]: string;
    } | null;
    required?: boolean;
    choices?: ApplicationCommandOptionChoiceData[];
    options?: ApplicationCommandOptionData[];
    channel_types: ChannelTypes[];
    min_value?: number;
    max_value?: number;
    autocomplete?: boolean;
}

export interface ApplicationCommandOptionChoiceData {
    name: string;
    name_localizations?: {
        [k: string]: string;
    } | null;
    value: string | number;
}
