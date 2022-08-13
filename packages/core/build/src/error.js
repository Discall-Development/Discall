"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExisted = exports.ErrorStatus = exports.MultiDefault = exports.InvalidHttpRequest = exports.EditWithEmptyData = exports.EmptyError = exports.NoneValidEncryptionMode = exports.CreateBotError = void 0;
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
class EmptyError extends Error {
    constructor(type) {
        super(`Can't create empty ${type}.`);
    }
}
exports.EmptyError = EmptyError;
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
class ErrorStatus extends Error {
    constructor(code) {
        super(`Error Code: ${code}`);
    }
}
exports.ErrorStatus = ErrorStatus;
class CommandExisted extends Error {
    constructor(name) {
        super(`Command "${name}" has existed.`);
    }
}
exports.CommandExisted = CommandExisted;
