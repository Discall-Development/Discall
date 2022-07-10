import { DCommand, DCommandChannel, DCommandOption, DCommandPermissionFlags, MessageCreateEventData, PermissionFlags } from "./dataType";
import { waitDataError } from "./errors";
import { packEvent } from "./event";
import { createUID, getUIDs } from "./util";

let commands: Record<string, DCommand> = {};
let channels: Record<string, DCommandChannel> = {};
let channelQueues: Record<string, DCommandChannel[]> = {};
let channelDatas: Record<string, Record<string, any>> = {};

let channelTimeout = 0;
function getNextData(name: string) {
    return new Promise((resolve, reject) => {
        let time = 0;
        let id = setInterval(() => {
            time += 10;
            if (getUIDs(name).length > 0) {
                clearInterval(id);
                resolve(getUIDs(name)[0]);
            }

            if (time > channelTimeout * 1000) {
                clearInterval(id);
                reject("timeout");
            }
        }, 10);
    });
}

export function createCommand({ name, run, option, permissions }: {
    name: string;
    run: (...args: any[]) => Promise<any>;
    option: DCommandOption;
    permissions: number;
}): DCommand {
    channelQueues[name] = [];
    channelDatas[name] = {};

    let channel: DCommandChannel = {
        async send(...args: any[]) {
            channelDatas[name][createUID(name)] = args;
        },
        async getCommandData(name: string) {
            if (channelDatas[name])
                return channelDatas[name].shift();
    
            return await getNextData(name).catch(() => {
                throw new waitDataError(name);
            });
        }
    };

    channels[name] = channel;
    let command: DCommand = {
        name,
        run,
        option,
        permissions,
    };

    commands[name] = command;
    return command;
}

type Seconed = number;
export async function setupHandler(prefix: string, timeout: Seconed = 0, send: (...items: any) => any) {
    channelTimeout = timeout;
    packEvent("message_create")(async (data: MessageCreateEventData) => {
        let params = data.content.trim().split(/ +/g);

        if (params[0].startsWith(prefix)) {
            let name = params[0].slice(prefix.length);
            if (!commands[name]) return;   
            
            let permission = commands[name].permissions;
            if (await checkPermission(permission, data, send)) {}
        }
    });
}

async function checkPermission(permission: number, data: MessageCreateEventData, send: (...params: any[]) => any): boolean {
    if (permission & DCommandPermissionFlags.BOT_OWNER)
        if (data.author.id === data.author.id)
            return true;

    if (permission & DCommandPermissionFlags.OWNER)
        if (data.author.id === await send(await getGuild(data.guild_id)))
            return true;

    return false;
}