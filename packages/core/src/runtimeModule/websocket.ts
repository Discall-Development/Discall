import * as WS from 'ws';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WebSocket {
    export type OpenEvent = WS.Event;
    export type CloseEvent = WS.CloseEvent;
    export type ErrorEvent = WS.ErrorEvent;
    export type MessageEvent = WS.MessageEvent;
    export type WebSocket = WS.WebSocket;
    export const WebSocket = WS.WebSocket;
}