import sodium from "libsodium-wrappers";

void (async () => {
  await sodium.ready;
})();

export function open(buffer: Buffer, nonce: Buffer, secretKey: Uint8Array) {
  return sodium.crypto_secretbox_open_easy(buffer, nonce, secretKey);
}

export function close(opusPacket: Buffer, nonce: Buffer, secretKey: Uint8Array) {
  return sodium.crypto_secretbox_easy(opusPacket, nonce, secretKey);
}

export function random(bytes: number, nonce: Buffer) {
  return sodium.randombytes_buf(bytes, nonce as any);
}