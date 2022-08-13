/// <reference types="node" />
import { WebSocket } from "../runtimeModule";
import { DiscordData, SnowflakeData } from "@discall/types";
import __ws from "../ws";
export default function voice(_ws: ReturnType<typeof __ws>): typeof _ws;
export declare function send(ws: WebSocket.WebSocket, data: DiscordData): Promise<void>;
export declare function sendPacket(server_id: SnowflakeData, data: Buffer): Promise<void>;
