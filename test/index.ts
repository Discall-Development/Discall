import bot from "../src/bot";

bot(process.env.Discall, {
    intents: 513,
    prefix: "!"
});