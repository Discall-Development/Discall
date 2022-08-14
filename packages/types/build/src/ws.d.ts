export interface DiscordData {
    op: number;
    d?: unknown;
    s?: number;
    t?: string;
}
export declare enum Intents {
    GUILDS = 1,
    GUILD_MEMBERS = 2,
    GUILD_BANS = 4,
    GUILD_EMOJIS_AND_STICKERS = 8,
    GUILD_INTEGRATIONS = 16,
    GUILD_WEBHOOKS = 32,
    GUILD_INVITES = 64,
    GUILD_VOICE_STATES = 128,
    GUILD_PRESENCES = 256,
    GUILD_MESSAGES = 512,
    GUILD_MESSAGE_REACTIONS = 1024,
    GUILD_MESSAGE_TYPING = 2048,
    DIRECT_MESSAGES = 4096,
    DIRECT_MESSAGE_REACTIONS = 8192,
    DIRECT_MESSAGE_TYPING = 16384,
    MESSAGE_CONTENT = 32768,
    GUILD_SCHEDULED_EVENTS = 65536
}
export declare enum Opcode {
    Dispatch = 0,
    Heartbeat = 1,
    Identity = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 6,
    Reconnect = 7,
    RequestGuildMember = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatACK = 11
}
export declare enum VoiceOpcode {
    Identity = 0,
    SelectProtocol = 1,
    Ready = 2,
    Heartbeat = 3,
    SessionDescription = 4,
    Speaking = 5,
    HeartbeatACK = 6,
    Resume = 7,
    Hello = 8,
    Resumed = 9,
    ClientDisconnect = 13
}
