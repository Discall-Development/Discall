export class VersionError extends Error {
	constructor(version: number) {
		super(`Version ${version} is not a vaild version.`);
	}
}

export class EncodingError extends Error {
	constructor(encoding: string) {
		super(`Encoding ${encoding} is not a vaild encoding.`);
	}
}