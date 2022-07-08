import {
    allIntents,
    createApplicationCommand,
    createBot,
    deleteApplicationCommand,
    editChannel,
    getApplicationCommand,
    getApplicationCommands,
    GuildCreateEventData,
    isEmpty,
    MessageCreateEventData,
    onGuildCreate,
    onMessageCreate,
    onReady,
    ReadyEventData,
    SnowflakeData,
    StickerData,
    updateApplicationCommand
} from "../src";

console.log("BotTest");
async function BotTest(): Promise<void> {
    let send = createBot(process.env.discall as string, {
        intents: allIntents(),
        prefix: "!",
    });

    let user_id: SnowflakeData;
    onReady(async (data: ReadyEventData) => {
        console.log(`API Version: ${data.v}`);
        console.log(`Login with '${data.user.username}'`);

        user_id = data.user.id;
        // await connectChannel(757188229651890186n, 761424295528235008n, false, true);
    });

    let stickers: { [k: string]: StickerData[] } = {};
    onGuildCreate(async (data: GuildCreateEventData) => {
        stickers[data.id as string] = data.stickers;
    });

    onMessageCreate(async (data: MessageCreateEventData) => {
        if (data.content.startsWith("changeName "))
            await send(await editChannel("guild")(991956052495048834n)({
                name: data.content.slice(10)
            }));

        // if (data.content.startsWith("say ") && data.author.id !== user_id)
        //     await send(createMessage(data.channel_id)({
        //         content: data.content.slice(3)
        //     }));
    });
}

await BotTest();