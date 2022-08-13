import { addCommand, bot, channel, create, defaultIntents, message } from "@discall/discall";
import { pipeline } from "@discall/simple-pipe";

let send = bot("TOKEN", {
    intents: defaultIntents(),
    prefix: "!"
});

let ping = addCommand({
    name: "ping",
    run: async (ctx) => {
        await pipeline(
            message,
            channel(ctx.channel_id),
            create,
            send
        ).execute({ content: "pong" });
    }
});