"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const event_1 = __importDefault(require("./event"));
const ws_1 = __importDefault(require("./ws"));
const error_1 = require("./error");
const ws_2 = __importDefault(require("./voice/ws"));
const https_1 = __importDefault(require("./https"));
function bot(token, { intents, prefix }) {
    if (intents === undefined)
        throw new error_1.CreateBotError("intents");
    if (token.split(".").length !== 3)
        throw new error_1.CreateBotError("token");
    let _ws = (0, ws_1.default)(token, intents);
    if (prefix)
        _ws = (0, command_1.default)(_ws, prefix);
    _ws = (0, event_1.default)(_ws);
    _ws = (0, ws_2.default)(_ws);
    return (0, https_1.default)(token);
}
exports.default = bot;
