import * as WS from "ws";
export declare module WebSocket {
    type OpenEvent = WS.Event;
    type CloseEvent = WS.CloseEvent;
    type ErrorEvent = WS.ErrorEvent;
    type MessageEvent = WS.MessageEvent;
    type WebSocket = WS.WebSocket;
    const WebSocket: typeof import("ws");
}
