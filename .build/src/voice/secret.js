"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.close = exports.open = void 0;
const sodium = __importStar(require("libsodium-wrappers"));
await sodium.ready;
function open(buffer, nonce, secretKey) {
    return sodium.crypto_secretbox_open_easy(buffer, nonce, secretKey);
}
exports.open = open;
function close(opusPacket, nonce, secretKey) {
    return sodium.crypto_secretbox_easy(opusPacket, nonce, secretKey);
}
exports.close = close;
function random(bytes, nonce) {
    return sodium.randombytes_buf(bytes, nonce);
}
exports.random = random;
