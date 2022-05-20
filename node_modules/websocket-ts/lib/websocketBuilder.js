"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketBuilder = void 0;
var websocket_1 = require("./websocket");
/**
 * Used to build Websocket-instances.
 */
var WebsocketBuilder = /** @class */ (function () {
    function WebsocketBuilder(url) {
        this.ws = null;
        this.onOpenListeners = [];
        this.onCloseListeners = [];
        this.onErrorListeners = [];
        this.onMessageListeners = [];
        this.onRetryListeners = [];
        this.url = url;
    }
    WebsocketBuilder.prototype.withProtocols = function (p) {
        this.protocols = p;
        return this;
    };
    WebsocketBuilder.prototype.withBackoff = function (backoff) {
        this.backoff = backoff;
        return this;
    };
    WebsocketBuilder.prototype.withBuffer = function (buffer) {
        this.buffer = buffer;
        return this;
    };
    WebsocketBuilder.prototype.onOpen = function (listener, options) {
        this.onOpenListeners.push({ listener: listener, options: options });
        return this;
    };
    WebsocketBuilder.prototype.onClose = function (listener, options) {
        this.onCloseListeners.push({ listener: listener, options: options });
        return this;
    };
    WebsocketBuilder.prototype.onError = function (listener, options) {
        this.onErrorListeners.push({ listener: listener, options: options });
        return this;
    };
    WebsocketBuilder.prototype.onMessage = function (listener, options) {
        this.onMessageListeners.push({ listener: listener, options: options });
        return this;
    };
    WebsocketBuilder.prototype.onRetry = function (listener, options) {
        this.onRetryListeners.push({ listener: listener, options: options });
        return this;
    };
    /**
     * Multiple calls to build() will always return the same websocket-instance.
     */
    WebsocketBuilder.prototype.build = function () {
        var _this = this;
        if (this.ws !== null)
            return this.ws;
        this.ws = new websocket_1.Websocket(this.url, this.protocols, this.buffer, this.backoff);
        this.onOpenListeners.forEach(function (h) { var _a; return (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.addEventListener(websocket_1.WebsocketEvents.open, h.listener, h.options); });
        this.onCloseListeners.forEach(function (h) { var _a; return (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.addEventListener(websocket_1.WebsocketEvents.close, h.listener, h.options); });
        this.onErrorListeners.forEach(function (h) { var _a; return (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.addEventListener(websocket_1.WebsocketEvents.error, h.listener, h.options); });
        this.onMessageListeners.forEach(function (h) { var _a; return (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.addEventListener(websocket_1.WebsocketEvents.message, h.listener, h.options); });
        this.onRetryListeners.forEach(function (h) { var _a; return (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.addEventListener(websocket_1.WebsocketEvents.retry, h.listener, h.options); });
        return this.ws;
    };
    return WebsocketBuilder;
}());
exports.WebsocketBuilder = WebsocketBuilder;
//# sourceMappingURL=websocketBuilder.js.map