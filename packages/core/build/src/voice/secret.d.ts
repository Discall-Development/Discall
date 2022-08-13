/// <reference types="node" />
export declare function close(opusPacket: Buffer, nonce: Buffer, secretKey: Uint8Array): Uint8Array;
export declare function random(bytes: number, nonce: Buffer): Uint8Array;
