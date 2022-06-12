var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  createWS: () => createWS
});
module.exports = __toCommonJS(ws_exports);
var import_ws = __toESM(require("ws"));
var import_etf = require("etf.js");
var import_logger = require("./logger");
var import_dataType = require("./dataType");
let Global = {
  sequence: null,
  session_id: null,
  events: {}
};
function createWS(token, intents, version = 9, encoding = "etf") {
  let wsUri = `wss://gateway.discord.gg?v=${version}&encoding=${encoding}`;
  let ws = new import_ws.default(wsUri);
  ws.onopen = (data) => onOpen(ws, data, token, intents, encoding);
  ws.onclose = onClose;
  ws.onerror = onError;
  ws.onmessage = (data) => onMessage(ws, data, encoding);
  return {
    ws,
    ready: packEvent("ready"),
    resumed: packEvent("resumed"),
    application_command_permissions_update: packEvent("application_command_permissions_update"),
    channel_create: packEvent("channel_create"),
    channel_update: packEvent("channel_update"),
    channel_delete: packEvent("channel_delete"),
    channel_pins_update: packEvent("channel_pins_update"),
    thread_create: packEvent("thread_create"),
    thread_update: packEvent("thread_update"),
    thread_delete: packEvent("thread_delete"),
    thread_list_sync: packEvent("thread_list_sync"),
    thread_member_update: packEvent("thread_member_update"),
    thread_members_update: packEvent("thread_members_update"),
    guild_create: packEvent("guild_create"),
    guild_update: packEvent("guild_update"),
    guild_delete: packEvent("guild_delete"),
    guild_ban_add: packEvent("guild_ban_add"),
    guild_ban_remove: packEvent("guild_ban_remove"),
    guild_emojis_update: packEvent("guild_emojis_update"),
    guild_stickers_update: packEvent("guild_stickers_update"),
    guild_integrations_update: packEvent("guild_integrations_update"),
    guild_member_add: packEvent("guild_member_add"),
    guild_member_remove: packEvent("guild_member_remove"),
    guild_member_update: packEvent("guild_member_update"),
    guild_member_chunk: packEvent("guild_member_chunk"),
    guild_role_create: packEvent("guild_role_create"),
    guild_role_update: packEvent("guild_role_update"),
    guild_role_delete: packEvent("guild_role_delete"),
    guild_scheduled_event_create: packEvent("guild_scheduled_event_create"),
    guild_scheduled_event_update: packEvent("guild_scheduled_event_update"),
    guild_scheduled_event_delete: packEvent("guild_scheduled_event_delete"),
    guild_scheduled_event_user_add: packEvent("guild_scheduled_event_user_add"),
    guild_scheduled_event_user_remove: packEvent("guild_scheduled_event_user_remove"),
    integration_create: packEvent("integration_create"),
    integration_update: packEvent("integration_update"),
    integration_delete: packEvent("integration_delete"),
    interaction_create: packEvent("interaction_create"),
    invite_create: packEvent("invite_create"),
    invite_delete: packEvent("invite_delete"),
    message_create: packEvent("message_create"),
    message_update: packEvent("message_update"),
    message_delete: packEvent("message_delete"),
    message_delete_bulk: packEvent("message_delete_bulk"),
    message_reaction_add: packEvent("message_reaction_add"),
    message_reaction_remove: packEvent("message_reaction_remove"),
    message_reaction_remove_all: packEvent("message_reaction_remove_all"),
    message_reaction_remove_emoji: packEvent("message_reaction_remove_emoji"),
    presence_update: packEvent("presence_update"),
    stage_instance_create: packEvent("stage_instance_create"),
    stage_instance_delete: packEvent("stage_instance_delete"),
    stage_instance_update: packEvent("state_instance_update"),
    typing_start: packEvent("typing_start"),
    user_update: packEvent("user_update"),
    voice_state_update: packEvent("voice_state_update"),
    voice_server_update: packEvent("voice_server_update"),
    webhooks_update: packEvent("webhooks_update")
  };
}
function packEvent(eventName) {
  return function(cb) {
    console.log(eventName);
    if (Array.isArray(Global.events[eventName]))
      Global.events[eventName].push(cb);
    else
      Global.events[eventName] = [cb];
  };
}
async function onOpen(ws, event, token, intents, encoding) {
  (0, import_logger.debug)("websocket opened");
  await Identity(ws, token, intents, encoding);
}
async function onClose(event) {
  (0, import_logger.debug)("websocket closed");
  process.exit();
}
async function onError(event) {
  (0, import_logger.error)("websocket failed");
  process.exit(1);
}
async function onMessage(ws, event, encoding) {
  let data;
  if (encoding == "json")
    data = JSON.parse(event.data);
  else
    data = decode(event.data);
  if (data.s !== void 0)
    Global.sequence = data.s;
  await processData(ws, encoding, data);
}
function decode(data) {
  return (0, import_etf.unpack)(data);
}
function encode(data) {
  return (0, import_etf.pack)(data);
}
async function processData(ws, encoding, data) {
  switch (data.op) {
    case import_dataType.Opcode.Dispatch:
      return await Dispatch(data);
    case import_dataType.Opcode.Heartbeat:
      return await Heartbeat(ws, data, encoding);
    case import_dataType.Opcode.Reconnect:
      return await Reconnect(data);
    case import_dataType.Opcode.InvalidSession:
      return await InvalidSession(data);
    case import_dataType.Opcode.Hello:
      return await Hello(ws, data, encoding);
    case import_dataType.Opcode.HeartbeatACK:
      return await HeartbeatACK(data);
  }
}
async function send(ws, data, encoding) {
  if (encoding == "etf")
    ws.send(encode(data));
  else
    ws.send(JSON.stringify(data));
}
async function Dispatch(data) {
  if (data.t !== void 0 && Global.events[data.t.toLowerCase()] !== void 0)
    for (const cb of Global.events[data.t.toLowerCase()]) {
      await cb(data.d);
    }
}
async function Heartbeat(ws, data, encoding) {
  await send(ws, __spreadProps(__spreadValues({}, data), { d: Global.sequence }), encoding);
}
async function Identity(ws, token, intents, encoding) {
  await send(ws, {
    op: 2,
    d: {
      token,
      intents,
      properties: {
        $os: "linux",
        $browser: "discall",
        $device: "discall"
      }
    }
  }, encoding);
}
async function PresenceUpdate(ws, data, encoding) {
}
async function VoiceStateUpdate(ws, data, encoding) {
}
async function Resume(ws, data, encoding) {
}
async function Reconnect(data) {
}
async function RequestGuildMembers(ws, data, encoding) {
}
async function InvalidSession(data) {
}
async function Hello(ws, data, encoding) {
  setInterval(Heartbeat, data.d.heartbeat_interval, ws, { op: 1 }, encoding);
}
async function HeartbeatACK(data) {
  (0, import_logger.debug)("heartbeat ACK received");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWS
});
//# sourceMappingURL=ws.js.map
