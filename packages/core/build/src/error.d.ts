export declare class CreateBotError extends Error {
    constructor(type: "intents" | "token" | "connect");
}
export declare class NoneValidEncryptionMode extends Error {
    constructor(modes: string[]);
}
export declare class EmptyError extends Error {
    constructor(type: string);
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
export declare class ErrorStatus extends Error {
    constructor(code: number);
}
export declare class CommandExisted extends Error {
    constructor(name: string);
}
