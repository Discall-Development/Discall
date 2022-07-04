# Discall

---

A async functional discord API wrapper.

It let you process everything with function. (ex. message, reaction, voice, etc.)



## Why I want to make this library?

---

~~Because I hate **discord.js**, ok?~~
(nothing)

Just for my another project [DBM discord-bot-maker](https://github.com/rexwu1104/DBM-discord-bot-maker)
(now is private)

## Example for make a Bot

---

this is a simple reply bot.

```typescript
import {
    createBot,
    createMessage,
    allIntents,
    onReady,
    ReadyEventData,
    onMessageCreate,
    MessageCreateEventData,
    SnowflakeData
} from "@discall/discall";

void (async () => {
    let send = createBot("TOKEN", {
        intents: allIntents(),
        prefix: "!"
    });

    let userId: SnowflakeData;
    onReady(async (data: ReadyEventData) => {
        userId = data.user_id;

        console.log("bot is online");
    });

    onMessageCreate(async (data: MessageCreateEventData) => {
        if (data.content.startsWith("say") && data.author.id !== userId)
            await send(await createMessage(data.channel_id)({
                content: data.content.slice(3)
            }));
    });
})();
```