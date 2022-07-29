import { Command, CommandPermissionsFlag, DiscordData, MessageCreateEventData, Opcode, PermissionFlags, SnowflakeData } from "./typo";
import get from "./utils/get";
import _ws from "./ws";

let commands: Record<string, Command<any>> = {};

let registed = false;
export default function commander(ws: ReturnType<typeof _ws>, prefix: string): ReturnType<typeof _ws> {
    if (registed)
        return ws;

    let wsMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        let data = await wsMessage(event) as DiscordData;
        if (data.op !== Opcode.Dispatch, data.t === "MESSAGE_CREATE")
            return;
            
        let message: MessageCreateEventData = data.d as MessageCreateEventData;
        let content = message.content.trim();
        if (content.split(/ +/g)[0].startsWith(prefix)) {
            let [name, ...args] = content.split(/ +/g);
            name = name.replace(prefix, "");

            await commands[name].run(message, ...args);
        }

        return data;
    }

    registed = true;
    return ws;
}

export function addCommand<T extends (v: any) => any>(command: {
    name: string;
    run: (context: MessageCreateEventData, ...args: ReturnType<T>[]) => Promise<void>;
    description?: string;
    help?: string;
}, options: {
    converters?: T[];
    permissions?: CommandPermissionsFlag;
    aliases?: string[];
    permission_data?: {
        roles?: SnowflakeData[];
        member?: SnowflakeData;
        user?: SnowflakeData;
    }
} = {}): Command<T> {
    let run = command.run;
    async function _run(data: MessageCreateEventData, ...args: ReturnType<T>[]) {
        if (check(data, options.permissions, options.permission_data)) {
            if (options.converters)
                return await run(data, ...options.converters.map((v, idx) => v(args[idx])));
            return await run(data, ...args);
        }
    }

    commands[command.name] = { ...command, run: _run, ...options };
    if (options.aliases)
        options.aliases.forEach(v => commands[v] = commands[command.name]);

    return commands[command.name];
}

function check(data: MessageCreateEventData, permissions: CommandPermissionsFlag, { roles, member, user }: {
    roles?: SnowflakeData[];
    member?: SnowflakeData;
    user?: SnowflakeData;
} = {}): boolean {
    let can = permissions ? false : true;
    if (!can && permissions & CommandPermissionsFlag.OWNER && data.guild_id)
        can = data.author.id === get("guild", data.guild_id).id;

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

addCommand({
    name: "test",
    run: async (ctx, str1, num1, num2) => {
        console.log(ctx.author.username, str1, num1, num2);
    }
}, {
    converters: [String, Number, Number]
});