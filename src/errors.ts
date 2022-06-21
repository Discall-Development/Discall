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
        super(`modes ${modes} doesn't have valid mode.`);
    }
}
