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
const src_1 = require("../src");
const types_1 = require("@discall/types");
dotenv.config();
const send = (0, src_1.bot)(process.env.Discall, {
    intents: (0, src_1.allIntents)(),
    prefix: '!'
});
(0, src_1.register)({
    name: types_1.EventName.GuildCreate,
    listener: async (g) => {
        console.log(g.name);
    }
}, {
    name: types_1.EventName.MessageReactionAdd,
    listener: async (r) => {
        console.log(r.emoji);
    }
});
(0, src_1.addCommand)({
    name: 'test',
    run: async (ctx) => {
        if (ctx.guild_id) {
            await send({
                op: types_1.Opcode.VoiceStateUpdate,
                d: {
                    guild_id: ctx.guild_id,
                    channel_id: '991593024146645073',
                    self_mute: false,
                    self_deaf: true
                }
            });
        }
    }
}, {
    aliases: ['t', 'te'],
    permissions: types_1.CommandPermissionsFlag.OWNER
});
