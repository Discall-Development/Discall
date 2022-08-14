"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApplicationCommandOptionChoice = exports.isApplicationCommandOption = exports.isApplicationCommand = exports.isApplicationCommandInteractionDataOption = exports.isResolve = exports.isIModalSubmit = exports.isIMessageComponent = exports.isIApplicationCommand = exports.isInteraction = void 0;
const channel_1 = require("./channel");
const guild_1 = require("./guild");
const message_1 = require("./message");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
const user_1 = require("./user");
function isInteraction(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        application_id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        data: (0, original_1.isTypeUndefined)((0, original_1.isUnion)(isIApplicationCommand, isIMessageComponent, isIModalSubmit)),
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        channel_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        member: (0, original_1.isTypeUndefined)(guild_1.isGuildMember),
        user: (0, original_1.isTypeUndefined)(user_1.isUser),
        token: original_1.isString,
        version: (0, original_1.isLiteral)(1),
        message: (0, original_1.isUnion)(message_1.isMessage, message_1.isMessageInteraction),
        locale: (0, original_1.isTypeUndefined)(channel_1.isLocaleOption),
        guild_locale: (0, original_1.isTypeUndefined)(channel_1.isLocaleOption)
    })(obj);
}
exports.isInteraction = isInteraction;
function isIApplicationCommand(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        type: original_1.isNumber,
        resolved: (0, original_1.isTypeUndefined)(isResolve),
        options: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isApplicationCommandInteractionDataOption)),
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        target_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake)
    })(obj);
}
exports.isIApplicationCommand = isIApplicationCommand;
function isIMessageComponent(obj) {
    return (0, original_1.isTypeObject)({
        custom_id: original_1.isString,
        component_type: original_1.isNumber,
        values: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(message_1.isSelectOption))
    })(obj);
}
exports.isIMessageComponent = isIMessageComponent;
function isIModalSubmit(obj) {
    return (0, original_1.isTypeObject)({
        custom_id: original_1.isString,
        components: (0, original_1.isTypeArray)(message_1.isMessageComponent)
    })(obj);
}
exports.isIModalSubmit = isIModalSubmit;
function isResolve(obj) {
    return (0, original_1.isTypeObject)({
        user: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, user_1.isUser)),
        members: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, guild_1.isGuildMember)),
        roles: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, guild_1.isRole)),
        channels: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, channel_1.isChannel)),
        messages: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, message_1.isMessage)),
        attachments: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(snowflake_1.isSnowflake, message_1.isAttachment))
    })(obj);
}
exports.isResolve = isResolve;
function isApplicationCommandInteractionDataOption(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        type: original_1.isNumber,
        value: (0, original_1.isTypeUndefined)((0, original_1.isUnion)(original_1.isNumber, original_1.isString)),
        options: (0, original_1.isTypeUndefined)(isApplicationCommandInteractionDataOption),
        focused: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isApplicationCommandInteractionDataOption = isApplicationCommandInteractionDataOption;
function isApplicationCommand(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: (0, original_1.isTypeUndefined)(original_1.isNumber),
        application_id: snowflake_1.isSnowflake,
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        name: original_1.isString,
        name_localizations: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)((0, original_1.isTypeRecord)(original_1.isString, original_1.isString))),
        description: original_1.isString,
        description_localizations: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)((0, original_1.isTypeRecord)(original_1.isString, original_1.isString))),
        options: (0, original_1.isTypeUndefined)(isApplicationCommandInteractionDataOption),
        default_member_permissions: (0, original_1.isTypeNull)(original_1.isString),
        dm_permission: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        default_permission: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isBoolean)),
        version: snowflake_1.isSnowflake
    })(obj);
}
exports.isApplicationCommand = isApplicationCommand;
function isApplicationCommandOption(obj) {
    return (0, original_1.isTypeObject)({
        type: original_1.isNumber,
        name: original_1.isString,
        name_localizations: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)((0, original_1.isTypeRecord)(original_1.isString, original_1.isString))),
        description: original_1.isString,
        description_localizations: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)((0, original_1.isTypeRecord)(original_1.isString, original_1.isString))),
        required: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        choices: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isApplicationCommandOptionChoice)),
        options: (0, original_1.isTypeUndefined)((0, original_1.isTypeArray)(isApplicationCommandOption)),
        channel_types: (0, original_1.isTypeArray)(original_1.isNumber),
        min_values: (0, original_1.isTypeUndefined)(original_1.isNumber),
        max_value: (0, original_1.isTypeUndefined)(original_1.isNumber),
        autocomplete: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isApplicationCommandOption = isApplicationCommandOption;
function isApplicationCommandOptionChoice(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        name_localizations: (0, original_1.isTypeUndefined)((0, original_1.isTypeRecord)(original_1.isString, original_1.isString)),
        value: (0, original_1.isUnion)(original_1.isString, original_1.isNumber)
    })(obj);
}
exports.isApplicationCommandOptionChoice = isApplicationCommandOptionChoice;
