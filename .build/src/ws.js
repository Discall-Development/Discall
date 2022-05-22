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
  default: () => DiscallWS
});
var import_ws = __toModule(require("ws"));
var import_etf = __toModule(require("etf.js"));
var import_type = __toModule(require("./type"));
var import_errors = __toModule(require("./errors"));
var import_Intents = __toModule(require("./Intents"));
const zlib_suffix = Buffer.from([0, 0, 255, 255]);
class DiscallWS {
  ws;
  encoding;
  processer;
  version;
  wsUri = new URL("wss://gateway.discord.gg");
  constructor(token, intents = import_Intents.default.none(), encoding = "etf", version = 9) {
    if (version < 8 || version > 9)
      throw new import_errors.VersionError(version);
    this.version = version;
    if (encoding !== "json" && encoding !== "etf")
      throw new import_errors.EncodingError(encoding);
    this.encoding = encoding;
    this.wsUri.searchParams.append("v", `${this.version}`);
    this.wsUri.searchParams.append("encoding", this.encoding);
    this.ws = new import_ws.default(this.wsUri.toString());
    this.ws.onopen = (e) => this.on_open(e);
    this.ws.onclose = (e) => this.on_close(e);
    this.ws.onerror = (e) => this.on_error(e);
    this.ws.onmessage = (e) => this.on_message(e);
    this.processer = new DiscordDataProcesser(token, intents);
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
  on_open(event) {
  }
  on_close(event) {
    console.log("ws closed.\n");
  }
  on_error(event) {
    console.log("ws errored.\n");
  }
  on_message(event) {
    let data = event.data;
    if (this.encoding == "etf") {
      data = this.decode(data);
    } else if (this.encoding == "json") {
      data = JSON.parse(data);
    }
    console.log(data);
    this.processData(data);
  }
  processData(data) {
    switch (data.op) {
      case import_type.OpCode.Dispatch:
        this.processer.Dispatch(data, this);
        break;
      case import_type.OpCode.Heartbeat:
        this.processer.Heartbeat(data, this);
        break;
      case import_type.OpCode.Reconnect:
        this.processer.Reconnect(data, this);
        break;
      case import_type.OpCode.InvalidSession:
        this.processer.InvalidSession(data, this);
        break;
      case import_type.OpCode.Hello:
        this.processer.Hello(data, this);
        break;
      case import_type.OpCode.HeartbeatACK:
        this.processer.HeartbeatACK(data, this);
        break;
    }
  }
  decode(buf) {
    return (0, import_etf.unpack)(buf);
  }
  encode(buf) {
    return (0, import_etf.pack)(buf);
  }
}
class DiscordDataProcesser {
  token;
  intents;
  sequence = null;
  heartbeat = 0;
  heartbeat_code;
  constructor(token, intents) {
    this.token = token;
    this.intents = intents.value;
  }
  Dispatch(data, ws) {
  }
  Heartbeat(data, ws) {
  }
  Identify(ws) {
    ws.send({
      op: 2,
      d: {
        token: this.token,
        intents: this.intents,
        properties: {
          $os: "linux",
          $browser: "discall",
          $device: "discall"
        }
      }
    });
  }
  VoiceStateUpdate(ws) {
  }
  Resume(ws) {
  }
  Reconnect(data, ws) {
  }
  RequestGuildMembers(ws) {
  }
  InvalidSession(data, ws) {
  }
  Hello(data, ws) {
    var _a;
    if (this.heartbeat)
      return;
    this.Identify(ws);
    this.heartbeat = (_a = data.d) == null ? void 0 : _a.heartbeat_interval;
    this.heartbeat_code = setInterval(() => {
      ws.send({
        op: 1,
        d: this.sequence
      });
    }, this.heartbeat);
  }
  HeartbeatACK(data, wss) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ws.js.map
