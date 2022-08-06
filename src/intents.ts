import {Intents} from "./types";

export function allIntents(): number {
    return (
        Intents.GUILDS |
        Intents.GUILD_MEMBERS |
        Intents.GUILD_BANS |
        Intents.GUILD_EMOJIS_AND_STICKERS |
        Intents.GUILD_INTEGRATIONS |
        Intents.GUILD_WEBHOOKS |
        Intents.GUILD_INVITES |
        Intents.GUILD_VOICE_STATES |
        Intents.GUILD_PRESENCES |
        Intents.GUILD_MESSAGES |
        Intents.GUILD_MESSAGE_REACTIONS |
        Intents.GUILD_MESSAGE_TYPING |
        Intents.DIRECT_MESSAGES |
        Intents.DIRECT_MESSAGE_REACTIONS |
        Intents.DIRECT_MESSAGE_TYPING |
        Intents.MESSAGE_CONTENT |
        Intents.GUILD_SCHEDULED_EVENTS
    );
}

export function defaultIntents(): number {
    return (
        Intents.GUILDS |
        Intents.GUILD_BANS |
        Intents.GUILD_EMOJIS_AND_STICKERS |
        Intents.GUILD_INTEGRATIONS |
        Intents.GUILD_WEBHOOKS |
        Intents.GUILD_INVITES |
        Intents.GUILD_VOICE_STATES |
        Intents.GUILD_MESSAGES |
        Intents.GUILD_MESSAGE_REACTIONS |
        Intents.GUILD_MESSAGE_TYPING |
        Intents.DIRECT_MESSAGES |
        Intents.DIRECT_MESSAGE_REACTIONS |
        Intents.DIRECT_MESSAGE_TYPING |
        Intents.GUILD_SCHEDULED_EVENTS
    );
}

export function noneIntents(): number {
    return 0;
}

export function customIntents(options: number[]) {
    let value: number = 0;
    for (const option of options)
        value |= option;

    return value;
}
