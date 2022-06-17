import {
  allIntents,
  connectChannel,
  createBot,
  GuildCreateEventData,
  onGuildCreate,
  onReady,
  ReadyEventData,
} from "../src";

export async function BotTest(): Promise<void> {
  createBot(process.env["WS_TOKEN"] as string, {
    intents: allIntents(),
    prefix: "!",
  });

  onReady(async (data: ReadyEventData) => {
    console.log(`API Version: ${data.v}`);
    console.log(`Login with '${data.user.username}'`);
  });

  onGuildCreate(async (data: GuildCreateEventData) => {
    console.log(`Guild ${data.name} created`);
    if (data.id === 757188229651890186n)
      await connectChannel(data.id, 761424295528235008n, false, true);
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
