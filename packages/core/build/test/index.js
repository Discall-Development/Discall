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
}, {
    name: types_1.EventName.MessageCreate,
    listener: async (m) => {
        (0, src_1.create)((0, src_1.channel)(m.channel_id)((0, src_1.message)(m.id)((0, src_1.reaction)('bot')('🤣'))));
        (0, src_1.get)((0, src_1.channel)(m.channel_id)((0, src_1.message)(m.id)((0, src_1.reaction)('all')('🤣'))));
        (0, src_1.remove)((0, src_1.channel)(m.channel_id)((0, src_1.message)(m.id)((0, src_1.reaction)('bot')('🤣'))));
        // await pipeline(
        //     reaction('bot'),
        //     message(m.id),
        //     channel(m.channel_id),
        //     create,
        //     send
        // ).execute('🤣').then(console.log);
        // await pipeline(
        //     reaction('all'),
        //     message(m.id),
        //     channel(m.channel_id),
        //     get,
        //     send
        // ).execute('🤣').then(console.log);
        // setTimeout(async () => {
        //     await pipeline(
        //         reaction('bot'),
        //         message(m.id),
        //         channel(m.channel_id),
        //         remove,
        //         send
        //     ).execute('🤣').then(console.log);
        // }, 1000);
    }
});
(0, src_1.addCommand)({
    name: 'test',
    run: async (ctx) => {
        if (ctx.guild_id)
            await (0, simple_pipe_1.pipeline)(src_1.auditLog, (0, src_1.guild)(ctx.guild_id), src_1.list, send).execute({
                user_id: ctx.author.id
            }).then(console.log);
    }
}, {
    aliases: ['t', 'te'],
    permissions: types_1.CommandPermissionsFlag.OWNER
});
