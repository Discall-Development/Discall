import { createSocket, Socket } from "dgram";

export function createUDP() {
  let socket = createSocket("udp4");

  socket.on("connect", () => onOpen(socket));
}

async function onOpen(socket: Socket) {}
