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
const dotenv = __importStar(require("dotenv"));
const simple_pipe_1 = require("@discall/simple-pipe");
const src_1 = require("../src");
const types_1 = require("@discall/types");
dotenv.config();
let send = (0, src_1.bot)(process.env.Discall, {
    intents: (0, src_1.allIntents)(),
    prefix: "!"
});
let guildCreateEvent = (0, src_1.register)({
    name: "guild_create",
    listener: async (guild) => {
        console.log(guild.name);
    }
});
let testCommand = (0, src_1.addCommand)({
    name: "test",
    run: async (ctx, num1, num2) => {
        await (0, simple_pipe_1.pipeline)(src_1.message, (0, src_1.channel)(ctx.channel_id), src_1.create, send).execute({
            content: `${num1} + ${num2} = ${num1 + num2}`
        });
    }
}, {
    converters: [Number, Number],
    aliases: ["t", "te"],
    permissions: types_1.CommandPermissionsFlag.OWNER
});
