import dotenv from "dotenv";
import {
    allIntents,
    createApplicationCommand,
    createBot,
    deleteApplicationCommand,
    editChannel,
    getApplicationCommand,
    getApplicationCommands,
    GuildCreateEventData,
    InteractionCreateEventData,
    isEmpty,
    MessageCreateEventData,
    onGuildCreate,
    onInteractionCreate,
    onMessageCreate,
    onReady,
    ReadyEventData,
    SnowflakeData,
    StickerData,
    updateApplicationCommand
} from "../src";
import {createClient} from "../src/https";
import * as process from "process";

dotenv.config();

export async function BotTest(): Promise<void> {
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
        console.log(data.name);
    });

    onInteractionCreate(async (data: InteractionCreateEventData) => {
        console.log(data.data?.name);
    });

    onMessageCreate(async (data: MessageCreateEventData) => {
        if (data.content.startsWith("changeName"))
            await send(editChannel("guild")(991956052495048834n)({
                name: data.content.slice(10)
            }));
    });
}

export async function CreateApplicationCommandTest(): Promise<void> {
    // create a Global Application Command
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let slashCommandCreator = createApplicationCommand("slash");
    let globalSlashCommandCreator = slashCommandCreator();
    let globalSlashCommandContentCreator = globalSlashCommandCreator(761231211020419082n);

    console.log(await clientSend(globalSlashCommandContentCreator("test-name", "test to get application command name")));
}

export async function GetApplicationCommandsTest(): Promise<void> {
    // get all Global Application Command
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let globalApplicationCommandsGetter = getApplicationCommands();

    console.log(await clientSend(globalApplicationCommandsGetter(761231211020419082n)));
}

export async function GetApplicationCommandTest(): Promise<void> {
    // get all Global Application Command
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let globalApplicationCommandGetter = getApplicationCommand();

    console.log(await clientSend(globalApplicationCommandGetter(761231211020419082n, 989091904509579305n)));
}

export async function UpdateApplicationCommandTest(): Promise<void> {
    // update a new Global Application Command
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let slashCommandCreator = createApplicationCommand("slash");
    let globalSlashCommandCreator = slashCommandCreator();
    let globalSlashCommandContentCreator = globalSlashCommandCreator(761231211020419082n);

    let newCommandData = globalSlashCommandContentCreator("new-test", "no description").data;

    let globalApplicationCommandUpdater = updateApplicationCommand();
    let globalApplicationCommandContentUpdater = globalApplicationCommandUpdater(761231211020419082n);
    console.log(await clientSend(globalApplicationCommandContentUpdater(989090441225977856n, newCommandData)));
}

export async function DeleteApplicationCommandTest(): Promise<void> {
    // delete a old Global Application Command
    let clientSend = await createClient(process.env["DBM_TOKEN"] as string);
    let globalApplicationCommandDeleter = deleteApplicationCommand();
    let globalApplicationCommandContentDeleter = globalApplicationCommandDeleter(761231211020419082n);

    console.log(await clientSend(globalApplicationCommandContentDeleter(989091904509579305n)));
}

export function utilTest() {
    let a: any = {};
    a.a = a;
    let b: any = {a};
    console.log(isEmpty(a));
    console.log(isEmpty(b));
}