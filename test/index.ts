import {
  allIntents,
  connectChannel,
  createBot,
  GuildCreateEventData,
  onGuildCreate,
  onReady,
  onResumed,
  ReadyEventData
} from "../src";
import {debug} from "../src/logger";

export async function BotTest(): Promise<void> {
  createBot(process.env["WS_TOKEN"] as string, {
    intents: allIntents(),
    prefix: "!"
  });

  onReady(async (data: ReadyEventData) => {
    console.log(`API Version: ${data.v}`);
    console.log(`Login with '${data.user.username}'`);
  });

  onGuildCreate(async (data: GuildCreateEventData) => {
    console.log(`Guild ${data.name} created`);
    // if (data.id === 757188229651890186n)
    //     await connectChannel(data.id, 761424295528235008n, false, true);
    //
    // if (data.id === 723162132082065501n)
    //     await connectChannel(data.id, 747454095643639858n, false, true);

    if (data.id === 757547089008787457n)
      await connectChannel(data.id, 931114852750086174n, false, true);
  });

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