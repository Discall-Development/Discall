"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latency = void 0;
const dgram_1 = require("dgram");
const secret_1 = require("./secret");
let pings = new Map();
let counters = new Map();
let timestamp = Math.floor(Math.random() * 2 ** 32);
let sequence = Math.floor(Math.random() * 2 ** 16);
let nonce = Buffer.alloc(24);
let keepAliveIDs = new Map();
let modes = new Map();
async function udp(ip, port, ssrc, server_id) {
    let socket = (0, dgram_1.createSocket)("udp4");
    let keepAlives = [];
    socket.on("message", (msg) => message(msg, keepAlives, server_id));
    socket.on("close", () => destroy(server_id));
    keepAliveIDs.set(server_id, setInterval(keepAlive, 5000, socket, ip, port, keepAlives, server_id));
    setImmediate(keepAlive, socket, ip, port, keepAlives, server_id);
    let ipPort = await performID(socket, ip, port, ssrc);
    return {
        send: async function (data, secretKey) {
            return await send(socket, ip, port, createAudioData(data, secretKey, ssrc, server_id));
        },
        set: function (_mode) {
            return modes.set(server_id, _mode);
        },
        config: ipPort
    };
}
exports.default = udp;
async function message(message, keepAlives, server_id) {
    if (message.length === 8) {
        let counter = message.readUInt32LE(0);
        let idx = keepAlives.findIndex(v => v.value === counter);
        if (idx === -1)
            return;
        pings.set(server_id, Date.now() - keepAlives[idx].timestamp);
        keepAlives.splice(0, idx);
    }
}
async function destroy(server_id) {
    clearInterval(keepAliveIDs.get(server_id));
    pings.delete(server_id);
    counters.delete(server_id);
    keepAliveIDs.delete(server_id);
    modes.delete(server_id);
}
function getIpPort(data) {
    let ip = data.subarray(8, data.indexOf(0, 8)).toString("utf-8");
    let port = data.readUInt16BE(data.length - 2);
    return {
        ip, port
    };
}
async function keepAlive(socket, ip, port, keepAlives, server_id) {
    if (keepAlive.length >= 12) {
        clearInterval(keepAliveIDs.get(server_id));
        return socket.close();
    }
    let buf = Buffer.alloc(8);
    let counter = counters.get(server_id);
    buf.writeUInt32LE(counter, 0);
    await send(socket, ip, port, buf);
    keepAlives.push({
        value: counter++,
        timestamp: Date.now()
    });
    if (counter > 429467295)
        counter = 0;
    counters.set(server_id, counter);
}
async function send(socket, ip, port, data) {
    return socket.send(data, port, ip);
}
function performID(socket, ip, port, ssrc) {
    return new Promise((resolve, _) => {
        socket.on("message", async function _(message) {
            try {
                if (message.readUInt16BE(0) !== 2)
                    return;
                let ipPort = getIpPort(message);
                socket.off("message", _);
                resolve(ipPort);
            }
            catch { }
        });
        let buf = Buffer.alloc(74);
        buf.writeUInt16BE(1, 0);
        buf.writeUInt16BE(70, 2);
        buf.writeUInt32BE(ssrc, 4);
        send(socket, ip, port, buf);
    });
}
function createAudioData(data, secretKey, ssrc, server_id) {
    let buf = Buffer.alloc(12);
    buf[0] = 0x80;
    buf[1] = 0x74;
    buf.writeUIntBE(sequence, 2, 2);
    buf.writeUIntBE(timestamp, 4, 4);
    buf.writeUIntBE(ssrc, 8, 8);
    buf.copy(nonce, 0, 0, 12);
    return Buffer.concat([buf, ...encryptData(data, secretKey, server_id)]);
}
function encryptData(data, secretKey, server_id) {
    let buf = Buffer.alloc(24);
    let rand;
    switch (modes.get(server_id)) {
        case "xsalsa20_poly1305_suffix":
            rand = (0, secret_1.random)(24, buf);
            return [(0, secret_1.close)(data, rand, secretKey), rand];
        case "xsalsa20_poly1305":
            return [(0, secret_1.close)(data, nonce, secretKey)];
    }
    return [];
}
function latency(server_id) {
    return pings.get(server_id);
}
exports.latency = latency;
