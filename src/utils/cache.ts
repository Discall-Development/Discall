import { ChannelData, EmojiData, GuildData, GuildMemberData, MessageData, PresenceUpdateEventData, SnowflakeData, UserData, VoiceStateData, WebhookData } from "../typo";

export default {
    guild: new Map<SnowflakeData, GuildData>(),
    channel: new Map<SnowflakeData, ChannelData>(),
    message: new Map<SnowflakeData, MessageData>(),
    member: new Map<SnowflakeData, GuildMemberData>(),
    user: new Map<SnowflakeData, UserData>(),
    emoji: new Map<SnowflakeData, EmojiData>(),
    webhook: new Map<SnowflakeData, WebhookData>(),
    presence: new Map<SnowflakeData, PresenceUpdateEventData>(),
    voicestate: new Map<SnowflakeData, VoiceStateData>()
}