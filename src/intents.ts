import {IntentsOptionsInterface} from "./dataType";

enum IntentsPermission {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_BANS = 1 << 2,
    GUILD_EMOJIS_AND_STICKERS = 1 << 3,
    GUILD_INTEGRATIONS = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_VOICE_STATES = 1 << 7,
    GUILD_PRESENCES = 1 << 8,
    GUILD_MESSAGES = 1 << 9,
    GUILD_MESSAGE_REACTIONS = 1 << 10,
    GUILD_MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
    MESSAGE_CONTENT = 1 << 15,
    GUILD_SCHEDULED_EVENTS = 1 << 16,
}

export function allIntents(): number {
    return (
        IntentsPermission.GUILDS |
        IntentsPermission.GUILD_MEMBERS |
        IntentsPermission.GUILD_BANS |
        IntentsPermission.GUILD_EMOJIS_AND_STICKERS |
        IntentsPermission.GUILD_INTEGRATIONS |
        IntentsPermission.GUILD_WEBHOOKS |
        IntentsPermission.GUILD_INVITES |
        IntentsPermission.GUILD_VOICE_STATES |
        IntentsPermission.GUILD_PRESENCES |
        IntentsPermission.GUILD_MESSAGES |
        IntentsPermission.GUILD_MESSAGE_REACTIONS |
        IntentsPermission.GUILD_MESSAGE_TYPING |
        IntentsPermission.DIRECT_MESSAGES |
        IntentsPermission.DIRECT_MESSAGE_REACTIONS |
        IntentsPermission.DIRECT_MESSAGE_TYPING |
        IntentsPermission.MESSAGE_CONTENT |
        IntentsPermission.GUILD_SCHEDULED_EVENTS
    );
}

export function defaultIntents(): number {
    return (
        IntentsPermission.GUILDS |
        IntentsPermission.GUILD_BANS |
        IntentsPermission.GUILD_EMOJIS_AND_STICKERS |
        IntentsPermission.GUILD_INTEGRATIONS |
        IntentsPermission.GUILD_WEBHOOKS |
        IntentsPermission.GUILD_INVITES |
        IntentsPermission.GUILD_VOICE_STATES |
        IntentsPermission.GUILD_MESSAGES |
        IntentsPermission.GUILD_MESSAGE_REACTIONS |
        IntentsPermission.GUILD_MESSAGE_TYPING |
        IntentsPermission.DIRECT_MESSAGES |
        IntentsPermission.DIRECT_MESSAGE_REACTIONS |
        IntentsPermission.DIRECT_MESSAGE_TYPING |
        IntentsPermission.GUILD_SCHEDULED_EVENTS
    );
}

export function noneIntents(): number {
    return 0;
}

export function customIntents(options: IntentsOptionsInterface) {
    let value: number = 0;
    if (options.guilds) value |= IntentsPermission.GUILDS;

    if (options.guildMembers) value |= IntentsPermission.GUILD_MEMBERS;

    if (options.guildBans) value |= IntentsPermission.GUILD_BANS;

    if (options.guildEmojisAndStickers)
        value |= IntentsPermission.GUILD_EMOJIS_AND_STICKERS;

    if (options.guildIntegrations) value |= IntentsPermission.GUILD_INTEGRATIONS;

    if (options.guildWebhooks) value |= IntentsPermission.GUILD_WEBHOOKS;

    if (options.guildInvites) value |= IntentsPermission.GUILD_INVITES;

    if (options.guildVoiceStates) value |= IntentsPermission.GUILD_VOICE_STATES;

    if (options.guildPresences) value |= IntentsPermission.GUILD_PRESENCES;

    if (options.guildMessage) value |= IntentsPermission.GUILD_MESSAGES;

    if (options.guildMessageReactions)
        value |= IntentsPermission.GUILD_MESSAGE_REACTIONS;

    if (options.guildMessageTyping)
        value |= IntentsPermission.GUILD_MESSAGE_TYPING;

    if (options.directMessage) value |= IntentsPermission.DIRECT_MESSAGES;

    if (options.directMessageReactions)
        value |= IntentsPermission.DIRECT_MESSAGE_REACTIONS;

    if (options.directMessageTyping)
        value |= IntentsPermission.DIRECT_MESSAGE_TYPING;

    if (options.messageContent) value |= IntentsPermission.MESSAGE_CONTENT;

    if (options.guildScheduledEvents)
        value |= IntentsPermission.GUILD_SCHEDULED_EVENTS;

    return value;
}
