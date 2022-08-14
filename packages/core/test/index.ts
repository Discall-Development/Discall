import * as dotenv from 'dotenv';
import { pipeline } from '@discall/simple-pipe';
import { bot, allIntents, register, addCommand, message, channel, create } from '../src';
import { GuildCreateEventData, CommandPermissionsFlag } from '@discall/types';

dotenv.config();
const send = bot(process.env.Discall as string, {
    intents: allIntents(),
    prefix: '!'
});

register({
    name: 'guild_create',
    listener: async (guild: GuildCreateEventData) => {
        return console.log(guild.name);
    }
});

addCommand({
    name: 'test',
    run: async (ctx, num1, num2) => {
        await pipeline(
            message,
            channel(ctx.channel_id),
            create,
            send
        ).execute({
            content: `${num1} + ${num2} = ${num1 + num2}`
        });
    }
}, {
    converters: [Number, Number],
    aliases: ['t', 'te'],
    permissions: CommandPermissionsFlag.OWNER
});

