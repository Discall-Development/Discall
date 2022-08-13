import { register } from "../event";
import { 
    ChannelCreateEventData, 
    ChannelData, 
    ChannelDeleteEventData, 
    ChannelUpdateEventData, 
    EmojiData, 
    EventName, 
    GuildBanAddEventData, 
    GuildCreateEventData, 
    GuildData, 
    GuildDeleteEventData, 
    GuildEmojisUpdateEventData, 
    GuildMemberAddEventData, 
    GuildMemberData, 
    GuildMemberRemoveEventData, 
    GuildMemberUpdateEventData, 
    GuildUpdateEventData, 
    MessageCreateEventData, 
    MessageData, 
    MessageDeleteBulkEventData, 
    MessageDeleteEventData, 
    MessageUpdateEventData, 
    PresenceUpdateEventData, 
    SnowflakeData, 
    ThreadCreateEventData, 
    ThreadDeleteEventData, 
    ThreadUpdateEventData, 
    UserData, 
    UserUpdateEventData, 
    VoiceStateData, 
    VoiceStateUpdateEventData, 
    WebhookData
} from "@discall/types";

let caches = {
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

register({
    name: EventName.GuildCreate,
    listener: async (data: GuildCreateEventData) => {
        caches.guild.set(data.id, data);
    }
}, {
    name: EventName.GuildUpdate,
    listener: async (data: GuildUpdateEventData) => {
        caches.guild.set(data.id, data);
    }
}, {
    name: EventName.GuildDelete,
    listener: async (data: GuildDeleteEventData) => {
        caches.guild.delete(data.id);
    }
}, {
    name: EventName.ChannelCreate,
    listener: async (data: ChannelCreateEventData) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: EventName.ChannelUpdate,
    listener: async (data: ChannelUpdateEventData) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: EventName.ChannelDelete,
    listener: async (data: ChannelDeleteEventData) => {
        caches.channel.delete(data.id);
    }
}, {
    name: EventName.ThreadCreate,
    listener: async (data: ThreadCreateEventData) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: EventName.ThreadUpdate,
    listener: async (data: ThreadUpdateEventData) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: EventName.ThreadDelete,
    listener: async (data: ThreadDeleteEventData) => {
        caches.channel.delete(data.id);
    }
}, {
    name: EventName.MessageCreate,
    listener: async (data: MessageCreateEventData) => {
        caches.message.set(data.id, data);
    }
}, {
    name: EventName.MessageUpdate,
    listener: async (data: MessageUpdateEventData) => {
        caches.message.set(data.id, data);
    }
}, {
    name: EventName.MessageDelete,
    listener: async (data: MessageDeleteEventData) => {
        caches.message.delete(data.id);
    }
}, {
    name: EventName.MessageDeleteBulk,
    listener: async (data: MessageDeleteBulkEventData) => {
        data.ids.forEach(v => caches.message.delete(v));
    }
}, {
    name: EventName.GuildMemberAdd,
    listener: async (data: GuildMemberAddEventData) => {
        caches.member.set(data.user?.id as SnowflakeData, data);
    }
}, {
    name: EventName.GuildMemberUpdate,
    listener: async (data: GuildMemberUpdateEventData) => {
        caches.member.set(data.user.id, { 
            ...data, 
            join_at: caches.member.get(data.user.id)?.join_at
        } as GuildMemberData);
    }
}, {
    name: EventName.GuildMemberRemove,
    listener: async (data: GuildMemberRemoveEventData) => {
        caches.member.delete(data.user.id);
    }
}, {
    name: EventName.GuildBanAdd,
    listener: async (data: GuildBanAddEventData) => {
        caches.member.delete(data.user.id);
    }
}, {
    name: EventName.UserUpdate,
    listener: async (data: UserUpdateEventData) => {
        caches.user.set(data.id, data);
    }
}, {
    name: EventName.GuildEmojisUpdate,
    listener: async (data: GuildEmojisUpdateEventData) => {
        data.emojis.forEach(v => caches.emoji.set(v.id as SnowflakeData, v));
    }
}, {
    name: EventName.PresenceUpdate,
    listener: async (data: PresenceUpdateEventData) => {
        caches.presence.set(data.user.id, data);
    }
}, {
    name: EventName.VoiceStateUpdate,
    listener: async (data: VoiceStateUpdateEventData) => {
        caches.voicestate.set(data.user_id, data);
    }
});

export default caches;