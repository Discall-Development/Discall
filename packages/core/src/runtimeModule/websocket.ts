import * as WS from "ws";
export module WebSocket {
    export type OpenEvent = WS.Event;
    export type CloseEvent = WS.CloseEvent;
    export type ErrorEvent = WS.ErrorEvent;
    export type MessageEvent = WS.MessageEvent;
    export type WebSocket = WS.WebSocket;
    export const WebSocket = WS.WebSocket;
}