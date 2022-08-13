"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApplicationCommandOptionChoice = exports.isApplicationCommandOption = exports.isApplicationCommand = exports.isApplicationCommandInteractionDataOption = exports.isResolve = exports.isIModalSubmit = exports.isIMessageComponent = exports.isIApplicationCommand = exports.isInteraction = void 0;
function isInteraction(obj) {
    let keys = ["id", "application_id", "type", "data", "guild_id", "channel_id", "member", "user", "token", "version", "message", "locale", "guild_locale"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isInteraction = isInteraction;
function isIApplicationCommand(obj) {
    let keys = ["id", "name", "type", "resolved", "options", "guild_id", "target_id"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIApplicationCommand = isIApplicationCommand;
function isIMessageComponent(obj) {
    let keys = ["custom_id", "component_type", "values"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIMessageComponent = isIMessageComponent;
function isIModalSubmit(obj) {
    let keys = ["custom_id", "components"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isIModalSubmit = isIModalSubmit;
function isResolve(obj) {
    let keys = ["users", "members", "roles", "channels", "messages", "attachments"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isResolve = isResolve;
function isApplicationCommandInteractionDataOption(obj) {
    let keys = ["name", "type", "value", "options", "focused"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplicationCommandInteractionDataOption = isApplicationCommandInteractionDataOption;
function isApplicationCommand(obj) {
    let keys = ["id", "type", "application_id", "guild_id", "name", "name_localizations", "description", "description_localizations", "options", "default_member_permissions", "dm_permission", "default_permission", "version"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplicationCommand = isApplicationCommand;
function isApplicationCommandOption(obj) {
    let keys = ["type", "name", "name_localizations", "description", "description_localizations", "required", "choices", "options", "channel_types", "min_value", "max_value", "autocomplete"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplicationCommandOption = isApplicationCommandOption;
function isApplicationCommandOptionChoice(obj) {
    let keys = ["name", "name_localizations", "value"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplicationCommandOptionChoice = isApplicationCommandOptionChoice;
