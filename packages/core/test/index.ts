import * as dotenv from 'dotenv';
import { pipeline } from '@discall/simple-pipe';
import { bot, allIntents, register, addCommand, guild, list, auditLog, reaction, message, create, channel, remove, get } from '../src';
import { GuildCreateEventData, CommandPermissionsFlag, EventName, MessageReactionAddEventData, MessageCreateEventData } from '@discall/types';

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
}, {
    name: EventName.MessageCreate,
    listener: async (m: MessageCreateEventData) => {
        create(channel(m.channel_id)(message(m.id)(reaction('bot')('🤣') as never)));
        get(channel(m.channel_id)(message(m.id)(reaction('all')('🤣') as never)));
        remove(channel(m.channel_id)(message(m.id)(reaction('bot')('🤣') as never)));
        // await pipeline(
        //     reaction('bot'),
        //     message(m.id),
        //     channel(m.channel_id),
        //     create,
        //     send
        // ).execute('🤣').then(console.log);
        // await pipeline(
        //     reaction('all'),
        //     message(m.id),
        //     channel(m.channel_id),
        //     get,
        //     send
        // ).execute('🤣').then(console.log);
        
        // setTimeout(async () => {
        //     await pipeline(
        //         reaction('bot'),
        //         message(m.id),
        //         channel(m.channel_id),
        //         remove,
        //         send
        //     ).execute('🤣').then(console.log);
        // }, 1000);
    }
});

addCommand({
    name: 'test',
    run: async (ctx) => {
        if (ctx.guild_id)
            await pipeline(
                auditLog,
                guild(ctx.guild_id),
                list,
                send
            ).execute({
                user_id: ctx.author.id
            }).then(console.log);
    }
}, {
    aliases: ['t', 'te'],
    permissions: CommandPermissionsFlag.OWNER
});

