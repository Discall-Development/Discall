# Discall
---
A async functional discord API wrapper.

It let you process everything with function. (ex. message, reaction, voice, etc.)



## Why I want to make this library?
---
because I want practice my code skill and make it for my another project.

and I hope it can be more convenient for everyone.

## Runtime

I make it for [bun](https://github.com/Jarred-Sumner/bun).

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

You will see this is **so different** to another package.

There is no **Bot** Object. 

Instead, here is a **send** function.

It is for send Https Request, and it accept our format.

## Request Format
---
```ts
{
    uri: (base: URL) => { uri: string, mode: string };
    data?: any;
    cache?: () => any | (data: any) => ant;
    reason?: string;
}
```

`reason` is always optional.

if `mode` is `"NONE"`, cache is necessary.

if `mode` is `"NONE"`, `"GET"` or `"DELETE"`, the `data` is disable.

if `mode` is `"POST"` or `"PATCH"`, the `data` is necessary.
---

# To do list
---

