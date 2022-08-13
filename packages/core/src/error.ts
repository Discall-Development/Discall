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

export class NoneValidEncryptionMode extends Error {
    constructor(modes: string[]) {
        super(`Modes ${modes} doesn't have valid mode.`);
    }
}

export class EmptyError extends Error {
    constructor(type: string) {
        super(`Can't create empty ${type}.`);
    }
}

export class EditWithEmptyData extends Error {
    constructor(type: string) {
        super(`Can't edit ${type} type with empty data.`);
    }
}

export class InvalidHttpRequest extends Error {
    constructor() {
        super("Can't send http request with invalid request object.");
    }
}

export class MultiDefault extends Error {
    constructor() {
        super("Set default option exceed once.");
    }
}

export class ErrorStatus extends Error {
    constructor(code: number) {
        super(`Error Code: ${code}`);
    }
}

export class CommandExisted extends Error {
    constructor(name: string) {
        super(`Command "${name}" has existed.`);
    }
}