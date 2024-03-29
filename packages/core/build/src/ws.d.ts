import { WebSocket } from './runtimeModule';
import { DiscordData } from '@discall/types';
interface WS extends WebSocket.WebSocket {
    onopen: () => Promise<void>;
    onclose: (event: WebSocket.CloseEvent) => Promise<WS>;
    onerror: () => Promise<void>;
    onmessage: (event: WebSocket.MessageEvent) => Promise<DiscordData>;
}
export default function ws(token: string, intents: number): WS;
export declare function send(ws: WebSocket.WebSocket, data: unknown): Promise<void>;
export {};
