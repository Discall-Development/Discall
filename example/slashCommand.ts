import {
    createApplicationCommand,
    createBot,
    defaultIntents
} from "../";

let send = createBot("Token here", {
    intents: defaultIntents()
});

let botId = 10000000000n;
let GlobalSlashCommandCreator = createApplicationCommand("slash")()(botId);

await send(await GlobalSlashCommandCreator(
    "test",
    "a test slash command"
));