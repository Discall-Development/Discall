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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const event_1 = __importDefault(require("./event"));
const ws_1 = __importStar(require("./ws"));
const error_1 = require("./error");
const ws_2 = __importDefault(require("./voice/ws"));
const https_1 = __importDefault(require("./https"));
const types_1 = require("@discall/types");
function bot(token, { intents, prefix }) {
    if (intents === undefined)
        throw new error_1.CreateBotError('intents');
    if (token.split('.').length !== 3)
        throw new error_1.CreateBotError('token');
    let _ws = (0, ws_1.default)(token, intents);
    if (prefix)
        _ws = (0, command_1.default)(_ws, prefix);
    _ws = (0, event_1.default)(_ws);
    _ws = (0, ws_2.default)(_ws);
    let close = _ws.onclose;
    _ws.onclose = async (event) => {
        _ws = await close(event);
        close = _ws.onclose;
        return _ws;
    };
    const send = (0, https_1.default)(token, _ws);
    return async function (packet) {
        if ((0, types_1.isHttpRequest)(packet))
            return await send(packet);
        switch (packet.op) {
            case types_1.Opcode.VoiceStateUpdate:
                return connectChannel(_ws, packet.d);
            case types_1.Opcode.PresenceUpdate:
                return updatePresence(_ws, packet.d);
            case types_1.Opcode.RequestGuildMember:
                return requestGuildMember(_ws, packet.d);
        }
    };
}
exports.default = bot;
async function connectChannel(ws, packet) {
    await (0, ws_1.send)(ws, {
        op: types_1.Opcode.VoiceStateUpdate,
        d: packet
    });
}
async function updatePresence(ws, packet) {
    await (0, ws_1.send)(ws, {
        op: types_1.Opcode.PresenceUpdate,
        d: packet
    });
}
async function requestGuildMember(ws, packet) {
    await (0, ws_1.send)(ws, {
        op: types_1.Opcode.RequestGuildMember,
        d: packet
    });
}
