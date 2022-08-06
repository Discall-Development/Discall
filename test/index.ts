import bot from "../src/bot";
import * as dotenv from "dotenv";
import { register } from "../src/event";
import { GuildCreateEventData } from "../src/types";
import { addCommand } from "../src/command";
import { allIntents } from "../src/intents";

dotenv.config();
bot(process.env.Discall as string, {
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
        console.log(num1, num2);
    }
}, {
    converters: [Number, Number],
    aliases: ["t", "te"]
});