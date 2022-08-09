# Discall
![](img/discall_background.png)

A async functional discord API wrapper written in [bun](https://github.com/Jarred-Sumner/bun).

It let you process everything with function. (ex. message, reaction, voice, etc.)



## Why do I want to make this library?
---
because I want practice my code skill and make it for my another project.

and I hope it can be more convenient for everyone.

## Example
---
How to let bot online? It is a simple way to do this.
```ts
let send = createBot("TOKEN", {
    intents: defaultIntents(),
    prefix: "!"
});

onReady(async (data: ReadyEventData) => {
    Bun.write(Bun.stdout, "bot is online\n");
});
```

You will see there is **so different** to another package.

There is no **Bot** Object. 

Instead, here is a **send** function.

It is for send Https Request, and it accept our format.

## Request Format
---
```ts
{
    uri: (base: URL) => { uri: string, mode: HttpMode };
    data?: any;
    cache?: () => any | (data: any) => any;
    reason?: string;
}
```

| mode | uri | data | reason | cache |
| :---: | :---: | :---: | :---: | :---: |
| GET \| DELETE | ✓ | x | - | ? |
| POST \| PUT | ✓ | ✓ | - | ? |
| NONE | x | x | x | ✓ |

| check | meaning |
| :---: | :---: |
| x | unable |
| ✓ | necessary |
| ? | optional | 
| - | according method |

## Other Docs
---
Please see our docs directory, [here](/docs)

# To do list

## Interactions
---
- [ ] ApplicationCommand
- [ ] MessageComponents
- [ ] InteractionResponse
## Resources
---
- [ ] Audit Log
- [ ] Auto Moderation
- [ ] Channel
- [ ] Emoji
- [ ] Guild
- [ ] Guild Scheduled Event
- [ ] Guild Template
- [ ] Invite
- [ ] Stage Instance
- [ ] Sticker
- [ ] User
- [ ] Voice
- [ ] Webhook
## Topics
---
- [x] Gateway
- [x] Voice Connections
## Extra
---
- [ ] Command
- [ ] CommandPermission
- [ ] CommandChannel
- [ ] InteractionResponse