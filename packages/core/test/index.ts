import * as dotenv from 'dotenv';
import { pipeline } from '@discall/simple-pipe';
import { bot, allIntents, register, addCommand, guild, list, auditLog } from '../src';
import { GuildCreateEventData, CommandPermissionsFlag, EventName, MessageReactionAddEventData } from '@discall/types';

dotenv.config();
const send = bot(process.env.Discall as string, {
    intents: allIntents(),
    prefix: '!'
});

register({
    name: EventName.GuildCreate,
    listener: async (guild: GuildCreateEventData) => {
        return console.log(guild.name);
    }
}, {
    name: EventName.MessageReactionAdd,
    listener: async (reaction: MessageReactionAddEventData) => {
        console.log(reaction.emoji);
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

