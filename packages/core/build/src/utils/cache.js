"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
const event_1 = require("../event");
const types_1 = require("@discall/types");
let caches = {
    guild: new Map(),
    channel: new Map(),
    message: new Map(),
    member: new Map(),
    user: new Map(),
    emoji: new Map(),
    webhook: new Map(),
    presence: new Map(),
    voicestate: new Map()
};
(0, event_1.register)({
    name: types_1.EventName.GuildCreate,
    listener: async (data) => {
        caches.guild.set(data.id, data);
    }
}, {
    name: types_1.EventName.GuildUpdate,
    listener: async (data) => {
        caches.guild.set(data.id, data);
    }
}, {
    name: types_1.EventName.GuildDelete,
    listener: async (data) => {
        caches.guild.delete(data.id);
    }
}, {
    name: types_1.EventName.ChannelCreate,
    listener: async (data) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: types_1.EventName.ChannelUpdate,
    listener: async (data) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: types_1.EventName.ChannelDelete,
    listener: async (data) => {
        caches.channel.delete(data.id);
    }
}, {
    name: types_1.EventName.ThreadCreate,
    listener: async (data) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: types_1.EventName.ThreadUpdate,
    listener: async (data) => {
        caches.channel.set(data.id, data);
    }
}, {
    name: types_1.EventName.ThreadDelete,
    listener: async (data) => {
        caches.channel.delete(data.id);
    }
}, {
    name: types_1.EventName.MessageCreate,
    listener: async (data) => {
        caches.message.set(data.id, data);
    }
}, {
    name: types_1.EventName.MessageUpdate,
    listener: async (data) => {
        caches.message.set(data.id, data);
    }
}, {
    name: types_1.EventName.MessageDelete,
    listener: async (data) => {
        caches.message.delete(data.id);
    }
}, {
    name: types_1.EventName.MessageDeleteBulk,
    listener: async (data) => {
        data.ids.forEach(v => caches.message.delete(v));
    }
}, {
    name: types_1.EventName.GuildMemberAdd,
    listener: async (data) => {
        caches.member.set(data.user?.id, data);
    }
}, {
    name: types_1.EventName.GuildMemberUpdate,
    listener: async (data) => {
        caches.member.set(data.user.id, {
            ...data,
            join_at: caches.member.get(data.user.id)?.join_at
        });
    }
}, {
    name: types_1.EventName.GuildMemberRemove,
    listener: async (data) => {
        caches.member.delete(data.user.id);
    }
}, {
    name: types_1.EventName.GuildBanAdd,
    listener: async (data) => {
        caches.member.delete(data.user.id);
    }
}, {
    name: types_1.EventName.UserUpdate,
    listener: async (data) => {
        caches.user.set(data.id, data);
    }
}, {
    name: types_1.EventName.GuildEmojisUpdate,
    listener: async (data) => {
        data.emojis.forEach(v => caches.emoji.set(v.id, v));
    }
}, {
    name: types_1.EventName.PresenceUpdate,
    listener: async (data) => {
        caches.presence.set(data.user.id, data);
    }
}, {
    name: types_1.EventName.VoiceStateUpdate,
    listener: async (data) => {
        caches.voicestate.set(data.user_id, data);
    }
});
exports.default = caches;
