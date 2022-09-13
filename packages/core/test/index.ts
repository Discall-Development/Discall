import * as dotenv from 'dotenv';
import { bot, allIntents, register, addCommand } from '../src';
import { GuildCreateEventData, CommandPermissionsFlag, EventName, MessageReactionAddEventData, Opcode } from '@discall/types';

dotenv.config();
const send = bot(process.env.Discall as string, {
    intents: allIntents(),
    prefix: '!'
});

register({
    name: EventName.GuildCreate,
    listener: async (g: GuildCreateEventData) => {
        console.log(g.name);
    }
}, {
    name: EventName.MessageReactionAdd,
    listener: async (r: MessageReactionAddEventData) => {
        console.log(r.emoji);
    }
});

addCommand({
    name: 'test',
    run: async (ctx) => {
        if (ctx.guild_id) {
            await send({
                op: Opcode.VoiceStateUpdate,
                d: {
                    guild_id: ctx.guild_id,
                    channel_id: '991593024146645073',
                    self_mute: false,
                    self_deaf: true
                }
            });
        }
    }
}, {
    aliases: ['t', 'te'],
    permissions: CommandPermissionsFlag.OWNER
});

