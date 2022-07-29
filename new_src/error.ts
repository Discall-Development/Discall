export class CreateBotError extends Error {
    constructor(type: "intents" | "token" | "connect") {
        switch (type) {
            case "intents":
                super("Can't create bot without intents.");
                break;
            case "token":
                super("Can't create bot with wrong token.");
                break;
            case "connect":
                super("Create bot failure with connect error.");
                break;
        }
    }
}