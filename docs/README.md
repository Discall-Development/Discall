# Docs
- [Docs](#docs)
  - [Installation](#installation)
  - [Command](#command)

Installation
---
---
download package with npm or bun.
```ts
// in node
npm install @discall/discall

// in bun
bun add @discall/discall
```

Command
---
---
register command with `addCommand`.
```ts
addCommand({
    name: "test",
    run: async (ctx) => {
        // ...do something
    }
});
```