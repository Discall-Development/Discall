import { ApplicationCommandData, ApplicationCommandInteractionDataOptionData, ApplicationCommandOptionChoiceData, ApplicationCommandOptionData, IApplicationCommandData, IMessageComponentData, IModalSubmitData, InteractionData, ResolveData } from '../interaction';
import { isChannel, isLocaleOption } from './channel';
import { isGuildMember, isRole } from './guild';
import { isAttachment, isMessage, isMessageComponent, isMessageInteraction, isSelectOption } from './message';
import { isBoolean, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeRecord, isTypeUndefined, isUnion } from './original';
import { isSnowflake } from './snowflake';
import { isUser } from './user';

export function isInteraction(obj: unknown): obj is InteractionData {
    return isTypeObject({
        id: isSnowflake,
        application_id: isSnowflake,
        type: isNumber,
        data: isTypeUndefined(isUnion(isIApplicationCommand, isIMessageComponent, isIModalSubmit)),
        guild_id: isTypeUndefined(isSnowflake),
        channel_id: isTypeUndefined(isSnowflake),
        member: isTypeUndefined(isGuildMember),
        user: isTypeUndefined(isUser),
        token: isString,
        version: isLiteral(1),
        message: isUnion(isMessage, isMessageInteraction),
        locale: isTypeUndefined(isLocaleOption),
        guild_locale: isTypeUndefined(isLocaleOption)
    })(obj);
}

export function isIApplicationCommand(obj: unknown): obj is IApplicationCommandData {
    return isTypeObject({
        id: isSnowflake,
        name: isString,
        type: isNumber,
        resolved: isTypeUndefined(isResolve),
        options: isTypeUndefined(isTypeArray(isApplicationCommandInteractionDataOption)),
        guild_id: isTypeUndefined(isSnowflake),
        target_id: isTypeUndefined(isSnowflake)
    })(obj);
}

export function isIMessageComponent(obj: unknown): obj is IMessageComponentData {
    return isTypeObject({
        custom_id: isString,
        component_type: isNumber,
        values: isTypeUndefined(isTypeArray(isSelectOption))
    })(obj);
}

export function isIModalSubmit(obj: unknown): obj is IModalSubmitData {
    return isTypeObject({
        custom_id: isString,
        components: isTypeArray(isMessageComponent)
    })(obj);
}

export function isResolve(obj: unknown): obj is ResolveData {
    return isTypeObject({
        user: isTypeUndefined(isTypeRecord(isSnowflake, isUser)),
        members: isTypeUndefined(isTypeRecord(isSnowflake, isGuildMember)),
        roles: isTypeUndefined(isTypeRecord(isSnowflake, isRole)),
        channels: isTypeUndefined(isTypeRecord(isSnowflake, isChannel)),
        messages: isTypeUndefined(isTypeRecord(isSnowflake, isMessage)),
        attachments: isTypeUndefined(isTypeRecord(isSnowflake, isAttachment))
    })(obj);
}

export function isApplicationCommandInteractionDataOption(obj: unknown): obj is ApplicationCommandInteractionDataOptionData {
    return isTypeObject({
        name: isString,
        type: isNumber,
        value: isTypeUndefined(isUnion(isNumber, isString)),
        options: isTypeUndefined(isApplicationCommandInteractionDataOption),
        focused: isTypeUndefined(isBoolean)
    })(obj);
}

export function isApplicationCommand(obj: unknown): obj is ApplicationCommandData {
    return isTypeObject({
        id: isSnowflake,
        type: isTypeUndefined(isNumber),
        application_id: isSnowflake,
        guild_id: isTypeUndefined(isSnowflake),
        name: isString,
        name_localizations: isTypeUndefined(isTypeNull(isTypeRecord(isString, isString))),
        description: isString,
        description_localizations: isTypeUndefined(isTypeNull(isTypeRecord(isString, isString))),
        options: isTypeUndefined(isApplicationCommandInteractionDataOption),
        default_member_permissions: isTypeNull(isString),
        dm_permission: isTypeUndefined(isBoolean),
        default_permission: isTypeUndefined(isTypeNull(isBoolean)),
        version: isSnowflake
    })(obj);
}

export function isApplicationCommandOption(obj: unknown): obj is ApplicationCommandOptionData {
    return isTypeObject({
        type: isNumber,
        name: isString,
        name_localizations: isTypeUndefined(isTypeNull(isTypeRecord(isString, isString))),
        description: isString,
        description_localizations: isTypeUndefined(isTypeNull(isTypeRecord(isString, isString))),
        required: isTypeUndefined(isBoolean),
        choices: isTypeUndefined(isTypeArray(isApplicationCommandOptionChoice)),
        options: isTypeUndefined(isTypeArray(isApplicationCommandOption)),
        channel_types: isTypeArray(isNumber),
        min_values: isTypeUndefined(isNumber),
        max_value: isTypeUndefined(isNumber),
        autocomplete: isTypeUndefined(isBoolean)
    })(obj);
}

export function isApplicationCommandOptionChoice(obj: unknown): obj is ApplicationCommandOptionChoiceData {
    return isTypeObject({
        name: isString,
        name_localizations: isTypeUndefined(isTypeRecord(isString, isString)),
        value: isUnion(isString, isNumber)
    })(obj);
}