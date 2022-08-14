"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
const error_1 = require("./error");
const types_1 = require("@discall/types");
const utils_1 = require("./utils");
const commands = {};
let registered = false;
function commander(ws, prefix) {
    if (registered)
        return ws;
    const onMessage = ws.onmessage;
    const onClose = ws.onclose;
    ws.onmessage = async (event) => {
        const data = await onMessage(event);
        if (data.op !== types_1.Opcode.Dispatch || data.t !== 'MESSAGE_CREATE')
            return data;
        const message = data.d;
        const content = message.content.trim();
        if (content.split(/ +/g)[0].startsWith(prefix)) {
            // eslint-disable-next-line prefer-const
            let [name, ...args] = content.split(/ +/g);
            name = name.replace(prefix, '');
            await commands[name].run(message, ...args);
        }
        return data;
    };
    ws.onclose = async (event) => {
        const ws = await onClose(event);
        registered = false;
        return commander(ws, prefix);
    };
    registered = true;
    return ws;
}
exports.default = commander;
function addCommand(command, options) {
    if (command.name in commands)
        throw new error_1.CommandExisted(command.name);
    if (options && options.aliases)
        options.aliases.forEach(v => {
            if (v in commands)
                throw new error_1.CommandExisted(v);
        });
    const run = command.run;
    async function _run(data, ...args) {
        if (!options)
            options = {};
        if (!options?.permissions)
            options.permissions = 0;
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
    if (!can && permissions & types_1.CommandPermissionsFlag.OWNER && data.guild_id)
        can = data.author.id === (0, utils_1.getCache)('guild', data.guild_id).owner_id;
    if (!can && permissions & types_1.CommandPermissionsFlag.ADMINISTRATOR && data.member)
        can = checkPermission(Number(data.member.permission), types_1.PermissionFlags.ADMINISTRATOR);
    if (!can && permissions & types_1.CommandPermissionsFlag.BOT)
        can = Boolean(data.author.bot);
    if (!can && roles && permissions & types_1.CommandPermissionsFlag.ROLE && data.member)
        can = data.member.roles.every(v => roles.findIndex(_v => _v === v) !== -1);
    if (!can && member && permissions & types_1.CommandPermissionsFlag.MEMBER && data.member)
        can = data.member.user?.id === member;
    if (!can && permissions & types_1.CommandPermissionsFlag.GROUP)
        can = !data.guild_id && !data.member;
    if (!can && user && permissions & types_1.CommandPermissionsFlag.USER)
        can = data.author.id === user && !data.member;
    return can;
}
function checkPermission(permission, check) {
    return permission & check ? true : false;
}
