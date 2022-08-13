"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const simple_pipe_1 = __importDefault(require("@discall/simple-pipe"));
const runtimeModule_1 = require("./runtimeModule");
const types_1 = require("@discall/types");
const GATEWAY_VERSION = 10;
const GATEWAY_ENCODING = "json";
const DEFAULT_GATEWAY_BASE = "wss://gateway.discord.gg";
let GATEWAY_BASE = DEFAULT_GATEWAY_BASE;
var State;
(function (State) {
    State[State["OPEN"] = 1] = "OPEN";
    State[State["CLOSE"] = 2] = "CLOSE";
    State[State["ERROR"] = 3] = "ERROR";
    State[State["RESUME"] = 4] = "RESUME";
    State[State["LOGIN"] = 5] = "LOGIN";
})(State || (State = {}));
let state;
let sequence = null;
let session_id;
let heartbeatID;
function ws(token, intents) {
    let ws = new runtimeModule_1.WebSocket.WebSocket(`${GATEWAY_BASE}?v=${GATEWAY_VERSION}&encoding=${GATEWAY_ENCODING}`);
    if (!state)
        state = State.OPEN;
    ws.onopen = () => open(ws, token, intents, sequence, session_id);
    ws.onclose = (event) => close(event, token, intents);
    ws.onerror = () => error();
    ws.onmessage = (event) => message(ws, event);
    return ws;
}
exports.default = ws;
async function send(ws, data) {
    return await (0, simple_pipe_1.default)(data)
        .pipe(JSON.stringify)
        .pipe(ws.send.bind(ws))
        .execute();
}
exports.send = send;
async function open(ws, token, intents, sequence, session_id) {
    switch (state) {
        case State.OPEN:
            return await login(ws, token, intents);
        case State.RESUME:
            return await resume(ws, token, sequence, session_id);
    }
}
async function close(event, token, intents) {
    clearInterval(heartbeatID);
    if (event.code < 4000 || event.code === 4015)
        state = State.RESUME;
    else if (event.code === 4009)
        state = State.OPEN;
    else
        process.exit(0);
    return ws(token, intents);
}
async function error() {
    process.exit(1);
}
async function message(ws, event) {
    let data = JSON.parse(event.data);
    switch (data.op) {
        case types_1.Opcode.Dispatch:
            if (data.t === "READY")
                GATEWAY_BASE = data.d?.resume_gateway_url;
            break;
        case types_1.Opcode.InvalidSession:
            process.exit(1);
        case types_1.Opcode.Hello:
            await keepAlive(ws, data.d.heartbeat_interval);
    }
    return data;
}
async function login(ws, token, intents) {
    return await send(ws, {
        op: types_1.Opcode.Identity,
        d: {
            token,
            intents,
            properties: {
                os: "linux",
                browser: "discall",
                device: "discall",
            },
        }
    });
}
async function resume(ws, token, sequence, session_id) {
    return await send(ws, {
        op: types_1.Opcode.Resume,
        d: {
            token,
            session_id: session_id,
            seq: sequence,
        }
    });
}
async function keepAlive(ws, heartbeat) {
    return heartbeatID = setInterval(async () => {
        await send(ws, {
            op: types_1.Opcode.Heartbeat,
            d: sequence
        });
    }, heartbeat);
}
