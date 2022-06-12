import {allIntents, createBot, GuildCreateEventData, onGuildCreate, onReady, ReadyEventData} from '../src';


export async function BotTest(): Promise<void> {
    createBot(process.env['WS_TOKEN'] as string, {
        intents: allIntents(),
        prefix: '!'
    });

    onReady(async (data: ReadyEventData) => {
        console.log(`API Version: ${data.v}`);
        console.log(`Login with '${data.user.username}'`);
    });

    onGuildCreate(async (data: GuildCreateEventData) => {
        console.log(`Guild ${data.name} created`)
    });
}