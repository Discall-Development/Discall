export class VersionError extends Error {
    constructor(version: number) {
        super(`Version ${version} is not a valid version.`);
    }
}

export class EncodingError extends Error {
    constructor(encoding: string) {
        super(`Encoding ${encoding} is not a valid encoding.`);
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