export class VersionError extends Error {
    constructor(version: number) {
        super(`Version ${version} is not a valid version.`);
    }
}

export class NoneValidEncryptionMode extends Error {
    constructor(modes: string[]) {
        super(`Modes ${modes} doesn't have valid mode.`);
    }
}

export class EmptyMessageError extends Error {
    constructor() {
        super("Can't create empty message.");
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

export class waitDataError extends Error {
    constructor(name: string) {
        super(`Get data timeout from ${name} channel.`);
    }
}

export class MultiDefault extends Error {
    constructor() {
        super("Set default option exceed once.");
    }
}