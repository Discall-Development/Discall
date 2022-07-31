import bot from "../src/bot";

bot(process.env.Discall as string, {
    intents: 513,
    prefix: "!"
});