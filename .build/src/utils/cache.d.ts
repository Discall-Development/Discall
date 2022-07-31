import { ChannelData, EmojiData, GuildData, GuildMemberData, MessageData, PresenceUpdateEventData, SnowflakeData, UserData, VoiceStateData, WebhookData } from "../typo";
declare const _default: {
    guild: Map<SnowflakeData, GuildData>;
    channel: Map<SnowflakeData, ChannelData>;
    message: Map<SnowflakeData, MessageData>;
    member: Map<SnowflakeData, GuildMemberData>;
    user: Map<SnowflakeData, UserData>;
    emoji: Map<SnowflakeData, EmojiData>;
    webhook: Map<SnowflakeData, WebhookData>;
    presence: Map<SnowflakeData, PresenceUpdateEventData>;
    voicestate: Map<SnowflakeData, VoiceStateData>;
};
export default _default;
