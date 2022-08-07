import bot from "../src/bot";
import * as dotenv from "dotenv";
import { register } from "../src/event";
import { GuildCreateEventData } from "../src/types";
import { addCommand } from "../src/command";
import { allIntents } from "../src/intents";
import { pipeline } from "@discall/simple-pipe";
import { message } from "../src/message";
import { create } from "../src/https";
import channel from "../src/channel";

dotenv.config();
let send = bot(process.env.Discall as string, {
    intents: allIntents(),
    prefix: "!"
});

let guildCreateEvent = register({
    name: "guild_create",
    listener: async (guild: GuildCreateEventData) => {
        console.log(guild.name);
    }
});

let testCommand = addCommand({
    name: "test",
    run: async (ctx, num1, num2) => {
        console.log(await pipeline(
            message,
            channel(ctx.channel_id),
            create,
            send
        ).execute({
            content: `${num1} + ${num2} = ${num1 + num2}`
        }));
    }
}, {
    converters: [Number, Number],
    aliases: ["t", "te"]
});

