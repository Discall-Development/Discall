var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  DiscallWS: () => DiscallWS
});
var import_websocket_ts = __toModule(require("websocket-ts"));
var import_errors = __toModule(require("./errors"));
class DiscallWS {
  ws;
  version;
  encoding;
  wsUri = new URL("wss://gateway.discord.gg");
  constructor(version = 9, encoding = "json", compress = false) {
    if (version < 8 || version > 9)
      throw new import_errors.VersionError(version);
    this.version = version;
    if (encoding !== "json" && encoding !== "etf")
      throw new import_errors.EncodingError(encoding);
    this.encoding = encoding;
    this.wsUri.searchParams.append("v", `${this.version}`);
    this.wsUri.searchParams.append("encoding", this.encoding);
    if (compress)
      this.wsUri.searchParams.append("compress", "zlib-stream");
    let builder = new import_websocket_ts.WebsocketBuilder(this.wsUri.toString()).onOpen(this.on_open).onClose(this.on_close).onError(this.on_error).onMessage(this.on_message).onRetry(this.on_retry);
    this.ws = builder.build();
  }
  on_open(ws, event) {
  }
  on_close(ws, event) {
  }
  on_error(ws, event) {
  }
  on_message(ws, event) {
    console.log(event.data, "\n-----------------------------");
  }
  on_retry(ws, event) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscallWS
});
//# sourceMappingURL=ws.js.map
