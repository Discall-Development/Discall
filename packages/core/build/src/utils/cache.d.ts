import { ChannelData, EmojiData, GuildData, GuildMemberData, MessageData, PresenceUpdateEventData, UserData, VoiceStateData, WebhookData } from '@discall/types';
declare let caches: {
    guild: Map<string, GuildData>;
    channel: Map<string, ChannelData>;
    message: Map<string, MessageData>;
    member: Map<string, GuildMemberData>;
    user: Map<string, UserData>;
    emoji: Map<string, EmojiData>;
    webhook: Map<string, WebhookData>;
    presence: Map<string, PresenceUpdateEventData>;
    voicestate: Map<string, VoiceStateData>;
};
export default caches;
