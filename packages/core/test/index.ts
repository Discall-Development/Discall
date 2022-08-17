import * as dotenv from 'dotenv';
import { pipeline } from '@discall/simple-pipe';
import { bot, allIntents, register, addCommand, guild, autoModeration, list } from '../src';
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
    run: async (ctx) => {
        if (ctx.guild_id)
            await pipeline(
                autoModeration('991978238622584862'),
                guild(ctx.guild_id),
                list,
                send
            ).execute({}).then(console.log);
    }
}, {
    aliases: ['t', 'te'],
    permissions: CommandPermissionsFlag.OWNER
});

