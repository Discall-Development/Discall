export declare class CreateBotError extends Error {
    constructor(type: "intents" | "token" | "connect");
}
export declare class NoneValidEncryptionMode extends Error {
    constructor(modes: string[]);
}
export declare class EmptyMessageError extends Error {
    constructor();
}
export declare class EditWithEmptyData extends Error {
    constructor(type: string);
}
export declare class InvalidHttpRequest extends Error {
    constructor();
}
export declare class MultiDefault extends Error {
    constructor();
}
