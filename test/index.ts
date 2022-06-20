import {
    allIntents,
    connectChannel,
    createBot,
    GuildCreateEventData,
    onGuildCreate,
    onReady,
    onResumed,
    ReadyEventData,
} from "../src";
import {debug} from "../src/logger";

export async function BotTest(): Promise<void> {
    createBot(process.env["DBM_TOKEN"] as string, {
        intents: allIntents(),
        prefix: "!",
    });

    onReady(async (data: ReadyEventData) => {
        console.log(`API Version: ${data.v}`);
        console.log(`Login with '${data.user.username}'`);
        await connectChannel(757188229651890186n, 761424295528235008n, false, true);
    });

    onGuildCreate(async (data: GuildCreateEventData) => {});

    onResumed(async (data) => {
        console.log(data);
        debug("websocket resumed.");
    });

    // onInviteCreate(async (data: any) => {
    //     console.log(data);
    // });

    // onMessageCreate(async (data: MessageData) => {
    //     console.log(data);
    // });

    // onMessageUpdate(async (data: any) => {
    //     console.log(data);
    // })
}
