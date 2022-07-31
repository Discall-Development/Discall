"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
const typo_1 = require("./typo");
const get_1 = __importDefault(require("./utils/get"));
let commands = {};
let registered = false;
function commander(ws, prefix) {
    if (registered)
        return ws;
    let wsMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        let data = await wsMessage(event);
        if (data.op !== typo_1.Opcode.Dispatch, data.t === "MESSAGE_CREATE")
            return data;
        let message = data.d;
        let content = message.content.trim();
        if (content.split(/ +/g)[0].startsWith(prefix)) {
            let [name, ...args] = content.split(/ +/g);
            name = name.replace(prefix, "");
            await commands[name].run(message, ...args);
        }
        return data;
    };
    registered = true;
    return ws;
}
exports.default = commander;
function addCommand(command, options = {
    permissions: 0
}) {
    let run = command.run;
    async function _run(data, ...args) {
        if (check(data, options.permissions, options.permission_data)) {
            if (options.converters)
                return await run(data, ...options.converters.map((v, idx) => v(args[idx])));
            return await run(data, ...args);
        }
    }
    commands[command.name] = { ...command, run: _run, ...options };
    if (options && options.aliases)
        options.aliases.forEach(v => commands[v] = commands[command.name]);
    return commands[command.name];
}
exports.addCommand = addCommand;
function check(data, permissions, { roles, member, user } = {}) {
    let can = permissions ? false : true;
    if (!can && permissions & typo_1.CommandPermissionsFlag.OWNER && data.guild_id)
        can = data.author.id === (0, get_1.default)("guild", data.guild_id).id;
    if (!can && permissions & typo_1.CommandPermissionsFlag.ADMINISTRATOR && data.member)
        can = checkPermission(Number(data.member.permission), typo_1.PermissionFlags.ADMINISTRATOR);
    if (!can && permissions & typo_1.CommandPermissionsFlag.BOT)
        can = Boolean(data.author.bot);
    if (!can && roles && permissions & typo_1.CommandPermissionsFlag.ROLE && data.member)
        can = data.member.roles.every(v => roles.findIndex(_v => _v === v) !== -1);
    if (!can && member && permissions & typo_1.CommandPermissionsFlag.MEMBER && data.member)
        can = data.member.user?.id === member;
    if (!can && permissions & typo_1.CommandPermissionsFlag.GROUP)
        can = !data.guild_id && !data.member;
    if (!can && user && permissions & typo_1.CommandPermissionsFlag.USER)
        can = data.author.id === user && !data.member;
    return can;
}
function checkPermission(permission, check) {
    return permission & check ? true : false;
}
