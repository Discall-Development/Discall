var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ws_exports = {};
__export(ws_exports, {
  default: () => DiscallWS
});
module.exports = __toCommonJS(ws_exports);
var import_ws = __toESM(require("ws"));
var import_etf = require("etf.js");
var import_type = require("./type");
var import_errors = require("./errors");
var import_Intents = __toESM(require("./Intents"));
var import_Processer = __toESM(require("./Processer"));
class DiscallWS {
  processer;
  ws;
  encoding;
  version;
  wsUri = new URL("wss://gateway.discord.gg");
  opened = false;
  constructor(token, intents = import_Intents.default.none(), encoding = "etf", version = 9, bot) {
    if (version < 8 || version > 9)
      throw new import_errors.VersionError(version);
    this.version = version;
    if (encoding !== "json" && encoding !== "etf")
      throw new import_errors.EncodingError(encoding);
    this.encoding = encoding;
    this.wsUri.searchParams.append("v", `${this.version}`);
    this.wsUri.searchParams.append("encoding", this.encoding);
    this.ws = new import_ws.default(this.wsUri.toString());
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.processer = new import_Processer.default(token, intents, bot);
  }
  send(data) {
    let raw_data;
    if (this.encoding == "json")
      raw_data = JSON.stringify(data);
    else
      raw_data = this.encode(data);
    this.ws.send(raw_data, (err) => {
      if (err)
        console.error(err);
    });
  }
  get isopen() {
    return this.opened;
  }
  onOpen(event) {
    this.opened = true;
  }
  onClose(event) {
    console.log("ws closed.\n");
  }
  onError(event) {
    console.log("ws errored.\n");
  }
  onMessage(event) {
    let data = event.data;
    if (this.encoding == "etf") {
      data = this.decode(data);
    } else if (this.encoding == "json") {
      data = JSON.parse(data);
    }
    this.processData(data).then(() => {
    });
  }
  async processData(data) {
    switch (data.op) {
      case import_type.OpCode.Dispatch:
        return await this.processer.Dispatch(data, this);
      case import_type.OpCode.Heartbeat:
        return await this.processer.Heartbeat(data, this);
      case import_type.OpCode.Reconnect:
        return await this.processer.Reconnect(data, this);
      case import_type.OpCode.InvalidSession:
        return await this.processer.InvalidSession(data, this);
      case import_type.OpCode.Hello:
        return await this.processer.Hello(data, this);
      case import_type.OpCode.HeartbeatACK:
        return await this.processer.HeartbeatACK(data, this);
    }
  }
  decode(buf) {
    return (0, import_etf.unpack)(buf);
  }
  encode(buf) {
    return (0, import_etf.pack)(buf);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ws.js.map
