/* eslint-disable quotes */
import * as sodium from "libsodium-wrappers";

(async () => {
    await sodium.ready;
})();
export function close(
    opusPacket: Buffer,
    nonce: Buffer,
    secretKey: Uint8Array
) {
    return sodium.crypto_secretbox_easy(opusPacket, nonce, secretKey);
}

export function random(bytes: number, nonce: Buffer) {
    return sodium.randombytes_buf(bytes, nonce as unknown as "uint8array");
}
