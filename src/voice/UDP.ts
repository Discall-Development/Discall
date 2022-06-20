import {createSocket, Socket} from "dgram";
import {debug, error} from "../logger";
import {close, random} from "./secret";

interface keepAliveStructure {
    value: number;
    timestamp: number;
}

let Global: {
    counter: number;
    ping: number;
    mode: string;
    timestamp: number;
    sequence: number;
    nonce: Buffer;
    keepAliveID?: any;
} = {
  counter: 0,
  ping: -1,
  mode: "",
  timestamp: Math.floor(Math.random() * 2 ** 32),
  sequence: Math.floor(Math.random() * 2 ** 16),
  nonce: Buffer.alloc(24)
};
export async function createUDP(ip: string, port: number, ssrc: number) {
  let socket = createSocket("udp4");
  let keepAlives: keepAliveStructure[] = [];

  socket.on("message", (message) => onMessage(socket, message, keepAlives));
  socket.on("close", () => onClose(socket));
  socket.on("error", (err) => onError(socket, err));

  Global.keepAliveID = setInterval(keepAlive, 5000, socket, ip, port, keepAlives);
  setImmediate(keepAlive, socket, ip, port, keepAlives);

  let ipPort = await performID(socket, ip, port, ssrc);
  return {
    send: async function(data: Buffer, secretKey: Uint8Array) {
      let packet = createAudioData(data, secretKey, ssrc);
      await send(socket, ip, port, packet);
    },
    setMode: function(mode: string) {
      Global.mode = mode;
    },
    config: ipPort
  };
}

async function onMessage(socket: Socket, message: Buffer, keepAlives: keepAliveStructure[]) {
  if (message.length === 8) {
    let counter = message.readUInt32LE(0);
    let idx = keepAlives.findIndex(({ value }) => value == counter);
    if (idx === -1)
      return;

    Global.ping = Date.now() - keepAlives[idx].timestamp;
    keepAlives.splice(0, idx);
  }
}

async function onClose(socket: Socket) {
  debug("UDP Socket closed.");
}

async function onError(socket: Socket, err: Error) {
  debug("UDP Socket failed.");
}

function getIpPort(data: Buffer) {
  let ip = data.slice(8, data.indexOf(0, 8)).toString("utf-8");
  let port = data.readUInt16BE(data.length - 2);

  return { ip, port };
}

async function keepAlive(socket: Socket, ip: string, port: number, keepAlives: keepAliveStructure[]) {
  if (keepAlives.length >= 12) {
    clearInterval(Global.keepAliveID);
    return socket.close();
  }

  let buf = Buffer.alloc(8);
  buf.writeUInt32LE(Global.counter, 0);
  await send(socket, ip, port, buf);

  keepAlives.push({
    value: Global.counter,
    timestamp: Date.now()
  });
  Global.counter++;

  if (Global.counter > 4294967295) {
    Global.counter = 0;
  }
}

async function send(socket: Socket, ip: string, port: number, data: Buffer) {
  return socket.send(data, port, ip);
}

function performID(socket: Socket, ip: string, port: number, ssrc: number) {
  return new Promise((resolve: (value: { ip: string, port: number }) => unknown, _) => {
    socket.on("message", async function _(message) {
      try {
        if (message.readUInt16BE(0) !== 2) return;
        let ipPort = getIpPort(message);
        socket.off("message", _);
        resolve(ipPort);
      } catch (err) {
        error((err as Error).toString());
      }
    });

    let buf = Buffer.alloc(74);

    buf.writeUInt16BE(1, 0);
    buf.writeUInt16BE(70, 2);
    buf.writeUint32BE(ssrc, 4);

    send(socket, ip, port, buf).then();
  });
}

function createAudioData(data: Buffer, secretKey: Uint8Array, ssrc: number) {
  let buf = Buffer.alloc(12);
  buf[0] = 0x80; buf[1] = 0x74;

  buf.writeUIntBE(Global.sequence, 2, 2);
  buf.writeUIntBE(Global.timestamp, 4, 4);
  buf.writeUIntBE(ssrc, 8, 8);

  buf.copy(Global.nonce, 0, 0, 12);
  return Buffer.concat([buf, ...encryptData(data, secretKey)]);
}

function encryptData(data: Buffer, secretKey: Uint8Array, nonce?: number) {
  let buf = Buffer.alloc(24);
  let rand: Uint8Array;
  switch (Global.mode) {
  case "xsalsa20_poly1305_lite":
    buf.writeUint32BE(nonce as number, 0);
    return [close(data, buf, secretKey), buf.slice(0, 4)];
  case "xsalsa20_poly1305_suffix":
    rand = random(24, buf);
    return [
      close(data, rand as Buffer, secretKey),
      rand
    ];
  case "xsalsa20_poly1305":
    return [close(data, Global.nonce, secretKey)];
  }
  return [];
}

export function getPing() {
  return Global.ping;
}