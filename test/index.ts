import {
    allIntents,
    connectChannel,
    createBot,
    GuildCreateEventData,
    InteractionCreateEventData,
    onGuildCreate,
    onInteractionCreate,
    onReady,
    onResumed,
    ReadyEventData,
    ResumeEventData,
} from "../src";
import {debug} from "../src/logger";
import {createClient} from "../src/https";
import {createApplicationCommand} from "../src/application";

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

    onGuildCreate(async (data: GuildCreateEventData) => {
        console.log(data.name);
    });

    onResumed(async (data: ResumeEventData) => {
        debug("websocket resumed.");
    });

    onInteractionCreate(async (data: InteractionCreateEventData) => {
        console.log(data.data?.name);
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

export async function ApplicationCommandTest(): Promise<void> {
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let slashCommandCreator = createApplicationCommand("slash");
    let globalSlashCommandCreator = slashCommandCreator();
    let globalSlashCommandContentCreator = globalSlashCommandCreator(761231211020419082n);

    await clientSend(globalSlashCommandContentCreator("test-name", "test to get application command name"));
}
