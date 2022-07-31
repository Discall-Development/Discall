"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("../src/bot"));
(0, bot_1.default)(process.env.Discall, {
    intents: 513,
    prefix: "!"
});
