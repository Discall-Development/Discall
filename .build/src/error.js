"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiDefault = exports.InvalidHttpRequest = exports.EditWithEmptyData = exports.EmptyMessageError = exports.NoneValidEncryptionMode = exports.CreateBotError = void 0;
class CreateBotError extends Error {
    constructor(type) {
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
exports.CreateBotError = CreateBotError;
class NoneValidEncryptionMode extends Error {
    constructor(modes) {
        super(`Modes ${modes} doesn't have valid mode.`);
    }
}
exports.NoneValidEncryptionMode = NoneValidEncryptionMode;
class EmptyMessageError extends Error {
    constructor() {
        super("Can't create empty message.");
    }
}
exports.EmptyMessageError = EmptyMessageError;
class EditWithEmptyData extends Error {
    constructor(type) {
        super(`Can't edit ${type} type with empty data.`);
    }
}
exports.EditWithEmptyData = EditWithEmptyData;
class InvalidHttpRequest extends Error {
    constructor() {
        super("Can't send http request with invalid request object.");
    }
}
exports.InvalidHttpRequest = InvalidHttpRequest;
class MultiDefault extends Error {
    constructor() {
        super("Set default option exceed once.");
    }
}
exports.MultiDefault = MultiDefault;
