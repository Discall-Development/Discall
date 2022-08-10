import { ApplicationCommandData, ApplicationCommandInteractionDataOptionData, IApplicationCommandData, IMessageComponentData, IModalSubmitData, InteractionData, ResolveData } from "../types/interaction";

export function isInteraction(obj: any): obj is InteractionData {
    let keys: (keyof InteractionData)[] = ["id", "application_id", "type", "data", "guild_id", "channel_id", "member", "user", "token", "version", "message", "locale", "guild_locale"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isIApplicationCommand(obj: any): obj is IApplicationCommandData {
    let keys: (keyof IApplicationCommandData)[] = ["id", "name", "type", "resolved", "options", "guild_id", "target_id"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isIMessageComponent(obj: any): obj is IMessageComponentData {
    let keys: (keyof IMessageComponentData)[] = ["custom_id", "component_type", "values"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isIModalSubmit(obj: any): obj is IModalSubmitData {
    let keys: (keyof IModalSubmitData)[] = ["custom_id", "components"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isResolve(obj: any): obj is ResolveData {
    let keys: (keyof ResolveData)[] = ["users", "members", "roles", "channels", "messages", "attachments"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isApplicationCommandInteractionDataOption(obj: any): obj is ApplicationCommandInteractionDataOptionData {
    let keys: (keyof ApplicationCommandInteractionDataOptionData)[] = ["name", "type", "value", "options", "focused"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isApplicationCommand(obj: any): obj is ApplicationCommandData {
    let keys: (keyof ApplicationCommandData)[] = ["id", "type", "application_id", "guild_id", "name", "name_localizations", "description", "description_localizations", "options", "default_member_permissions", "dm_permission", "default_permission", "version"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isApplicationCommandOption(obj: any): obj is ApplicationCommandOptionData {
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isApplicationCommandOptionChoice(obj: any): obj is ApplicationCommandOptionChoiceData {
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}