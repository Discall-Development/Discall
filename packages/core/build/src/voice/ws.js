"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPacket = exports.send = void 0;
const simple_pipe_1 = __importDefault(require("@discall/simple-pipe"));
const error_1 = require("../error");
const runtimeModule_1 = require("../runtimeModule");
const types_1 = require("@discall/types");
const udp_1 = __importDefault(require("./udp"));
var VoiceStates;
(function (VoiceStates) {
    VoiceStates[VoiceStates["OPEN"] = 1] = "OPEN";
    VoiceStates[VoiceStates["RESUME"] = 2] = "RESUME";
    VoiceStates[VoiceStates["LOGIN"] = 3] = "LOGIN";
    VoiceStates[VoiceStates["SELECT"] = 4] = "SELECT";
    VoiceStates[VoiceStates["READY"] = 5] = "READY";
})(VoiceStates || (VoiceStates = {}));
let registered = false;
const clients = new Map();
function voice(_ws) {
    if (registered)
        return _ws;
    const onMessage = _ws.onmessage;
    const onClose = _ws.onclose;
    let user_id, session_id;
    _ws.onmessage = async (event) => {
        const data = await onMessage(event);
        if (data.op === types_1.Opcode.Dispatch) {
            const ready = data.d;
            const server = data.d;
            switch (data.t) {
                case 'READY':
                    user_id = ready.user.id;
                    session_id = ready.session_id;
                    break;
                case 'VOICE_SERVER_UPDATE':
                    clients.set(server.guild_id, ws(server.endpoint, server.token, session_id, server.guild_id, user_id));
            }
        }
        return data;
    };
    _ws.onclose = async (event) => {
        const ws = await onClose(event);
        registered = false;
        return voice(ws);
    };
    registered = true;
    return _ws;
}
exports.default = voice;
const states = new Map();
const heartbeatIDs = new Map();
let ssrcs;
const udpSends = new Map();
function ws(endpoint, token, session_id, server_id, user_id) {
    const ws = new runtimeModule_1.WebSocket.WebSocket(`wss://${endpoint}?v=4`);
    if (!states.has(server_id))
        states.set(server_id, VoiceStates.OPEN);
    ws.onopen = () => open(ws, user_id, server_id, session_id, token);
    ws.onclose = (event) => close(event, endpoint, token, session_id, user_id, server_id);
    ws.onerror = () => error(server_id);
    ws.onmessage = (event) => message(ws, event, server_id);
    return ws;
}
async function send(ws, data) {
    return await (0, simple_pipe_1.default)(data)
        .pipe(JSON.stringify)
        .pipe(ws.send)
        .execute();
}
exports.send = send;
async function open(ws, user_id, server_id, session_id, token) {
    switch (states.get(server_id)) {
        case VoiceStates.OPEN:
            return await login(ws, user_id, server_id, session_id, token);
        case VoiceStates.RESUME:
            return await resume(ws, user_id, server_id, token);
    }
}
async function close(event, endpoint, token, session_id, user_id, server_id) {
    clearInterval(heartbeatIDs.get(server_id));
    if (event.code < 4000 || event.code === 4015) {
        states.set(server_id, VoiceStates.RESUME);
    }
    else if (event.code === 4006 || event.code === 4009) {
        states.set(server_id, VoiceStates.OPEN);
    }
    else {
        clients.delete(server_id);
        states.delete(server_id);
        heartbeatIDs.delete(server_id);
        ssrcs.delete(server_id);
        udpSends.delete(server_id);
        return;
    }
    clients.set(server_id, ws(endpoint, token, session_id, server_id, user_id));
}
async function error(server_id) {
    clients.delete(server_id);
    states.delete(server_id);
    heartbeatIDs.delete(server_id);
    ssrcs.delete(server_id);
    udpSends.delete(server_id);
}
async function message(ws, event, server_id) {
    const data = JSON.parse(event.data);
    switch (data.op) {
        case types_1.VoiceOpcode.Ready:
            return await ready(ws, data, server_id);
        case types_1.VoiceOpcode.SessionDescription:
            return await sessionDescription(data, server_id);
        case types_1.VoiceOpcode.Hello:
            return await keepAlive(ws, data.d.heartbeat_interval, server_id);
        case types_1.VoiceOpcode.ClientDisconnect:
            return await destroy(ws);
    }
}
async function login(ws, user_id, server_id, session_id, token) {
    states.set(server_id, VoiceStates.LOGIN);
    return await send(ws, {
        op: types_1.VoiceOpcode.Identity,
        d: {
            server_id,
            user_id,
            session_id,
            token
        }
    });
}
async function resume(ws, user_id, server_id, token) {
    states.set(server_id, VoiceStates.OPEN);
    return await send(ws, {
        op: types_1.VoiceOpcode.Resume,
        d: {
            server_id,
            user_id,
            token
        }
    });
}
async function ready(ws, data, server_id) {
    const { modes, ip, port, ssrc: _ssrc } = data.d;
    const _udp = await (0, udp_1.default)(ip, port, _ssrc, server_id);
    udpSends.set(server_id, _udp.send);
    ssrcs.set(server_id, _ssrc);
    _udp.set(await selectProtocol(ws, modes, _udp.config, server_id));
    states.set(server_id, VoiceStates.READY);
}
async function selectProtocol(ws, modes, config, server_id) {
    const valids = [
        'xsalsa20_poly1305',
        'xsalsa20_poly1305_suffix'
    ];
    const mode = modes.find(v => valids.includes(v));
    if (!mode)
        throw new error_1.NoneValidEncryptionMode(modes);
    states.set(server_id, VoiceStates.SELECT);
    await send(ws, {
        op: types_1.VoiceOpcode.SelectProtocol,
        d: {
            protocol: 'udp',
            data: {
                address: config.ip,
                port: config.port,
                mode
            }
        }
    });
    return mode;
}
async function sessionDescription(data, server_id) {
    const send = udpSends.get(server_id);
    return udpSends.set(server_id, async function (_data) {
        return await send(_data, data.d.secret_key);
    });
}
async function keepAlive(ws, heartbeat, server_id) {
    return heartbeatIDs.set(server_id, setInterval(async () => {
        await send(ws, {
            op: types_1.VoiceOpcode.Heartbeat,
            d: Date.now()
        });
    }, heartbeat));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function setSpeaking(ws, server_id) {
    return await send(ws, {
        op: types_1.VoiceOpcode.Speaking,
        d: {
            speaking: 5,
            delay: 0,
            ssrc: ssrcs.get(server_id)
        }
    });
}
async function destroy(ws) {
    ws.close(4000);
}
async function sendPacket(server_id, data) {
    const send = udpSends.get(server_id);
    await send(data);
}
exports.sendPacket = sendPacket;
