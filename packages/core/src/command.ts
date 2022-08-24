import { CommandExisted } from './error';
import { Command, CommandPermissionsFlag, DiscordData, MessageCreateEventData, Opcode, PermissionFlags, SnowflakeData } from '@discall/types';
import { getCache } from './utils';
import _ws from './ws';

const commands: Record<string, Command<(v: unknown) => unknown>> = {};
let registered = false;
export default function commander(ws: ReturnType<typeof _ws>, prefix: string): ReturnType<typeof _ws> {
    if (registered)
        return ws;

    const onMessage = ws.onmessage;
    const onClose = ws.onclose;
    ws.onmessage = async (event) => {
        const data = await onMessage(event) as DiscordData;
        if (data.op !== Opcode.Dispatch || data.t !== 'MESSAGE_CREATE')
            return data;
            
        const message: MessageCreateEventData = data.d as MessageCreateEventData;
        const content = message.content.trim();
        if (content.split(/ +/g)[0].startsWith(prefix)) {
            const [commandName, ...args] = content.split(/ +/g);
            const name = commandName.replace(prefix, '');

            if (name in commands)
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

export function addCommand<T extends (v: unknown) => unknown>(command: {
    name: string;
    run: (context: MessageCreateEventData, ...args: ReturnType<T>[]) => Promise<void>;
    description?: string;
    help?: string;
}, options?: {
    converters?: T[];
    permissions?: CommandPermissionsFlag;
    aliases?: string[];
    permission_data?: {
        roles?: SnowflakeData[];
        member?: SnowflakeData;
        user?: SnowflakeData;
    }
}): Command<T> {
    if (command.name in commands)
        throw new CommandExisted(command.name);

    if (options && options.aliases)
        options.aliases.forEach(v => {
            if (v in commands)
                throw new CommandExisted(v);
        });

    const run = command.run;
    async function _run(data: MessageCreateEventData, ...args: ReturnType<T>[]) {
        if (!options)
            options = {};

        if (!options?.permissions)
            options.permissions = 0;

        if (check(data, options.permissions, options.permission_data)) {
            if (options.converters)
                return await run(data, ...(options.converters.map((v, idx) => v(args[idx])) as ReturnType<T>[]));
            return await run(data, ...args);
        }
    }

    commands[command.name] = { ...command, run: _run as Command<(v: unknown) => unknown>['run'], ...options };
    if (options && options.aliases)
        options.aliases.forEach(v => commands[v] = commands[command.name]);

    return commands[command.name] as Command<T>;
}

function check(data: MessageCreateEventData, permissions: CommandPermissionsFlag, { roles, member, user }: {
    roles?: SnowflakeData[];
    member?: SnowflakeData;
    user?: SnowflakeData;
} = {}): boolean {
    let can = permissions ? false : true;
    if (!can && permissions & CommandPermissionsFlag.OWNER && data.guild_id)
        can = data.author.id === getCache('guild', data.guild_id).owner_id;

    if (!can && permissions & CommandPermissionsFlag.ADMINISTRATOR && data.member)
        can = checkPermission(Number(data.member.permission), PermissionFlags.ADMINISTRATOR);

    if (!can && permissions & CommandPermissionsFlag.BOT)
        can = Boolean(data.author.bot);

    if (!can && roles && permissions & CommandPermissionsFlag.ROLE && data.member)
        can = data.member.roles.every(v => roles.findIndex(_v => _v === v) !== -1);

    if (!can && member && permissions & CommandPermissionsFlag.MEMBER && data.member)
        can = data.member.user?.id === member;

    if (!can && permissions & CommandPermissionsFlag.GROUP)
        can = !data.guild_id && !data.member;
        
    if (!can && user && permissions & CommandPermissionsFlag.USER)
        can = data.author.id === user && !data.member;

    return can;
}

function checkPermission(permission: PermissionFlags, check: PermissionFlags): boolean {
    return permission & check ? true : false;
}