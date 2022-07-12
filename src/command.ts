import { DCommand, DCommandChannel, DCommandOption, DCommandPermissionFlags, MessageCreateEventData, PermissionFlags } from "./dataType";
import { waitDataError } from "./error";
import { packEvent } from "./event";
import { createUID, getUIDs } from "./util";

let commands: Record<string, DCommand> = {};
let channels: Record<string, DCommandChannel> = {};
let dataQueue: Record<string, any[]> = {};
let callbackQueue: Record<string, ((data: any[]) => any)[]> = {};

let channelTimeout = 0;

export function createCommand({ name, run, option, permissions }: {
    name: string;
    run: (...args: any[]) => Promise<any>;
    option: DCommandOption;
    permissions: number;
}): DCommand {
    dataQueue[name] = [];
    callbackQueue[name] = [];
    let channel: DCommandChannel = {
        async send(name: string, data: MessageCreateEventData, ...args: any[]) {
            if (callbackQueue[name])
                callbackQueue[name].forEach(v => {
                    v([data, args]);
                });
        },
        getCommandData(name: string, check: (data: MessageCreateEventData) => boolean) {
            return new Promise((resolve, _) => {
                let result;
                for (const idx in dataQueue[name]) {
                    if (check(dataQueue[name][idx][0])) {
                        result = dataQueue[name][idx][1];
                        delete dataQueue[name][idx];
                        return resolve(result);
                    }
                }

                callbackQueue[name].push((_data: any[]) => {
                    if (check(_data[0])) {
                        result = _data[1];
                        resolve(result);
                    }
                });

                setTimeout(() => {
                    if (!result)
                        resolve(null);
                }, channelTimeout * 1000);
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
export async function setupHandler(prefix: string = null, timeout: Seconed = 0, send: (...items: any) => any) {
    channelTimeout = timeout;
    if (prefix !== null)
        packEvent("message_create")(async (data: MessageCreateEventData) => {
            let nameWithPrefix = data.content.trim().split(/ +/g)[0];

            if (nameWithPrefix.startsWith(prefix)) {
                let name = nameWithPrefix.slice(prefix.length);
                if (!commands[name]) return;   
                
                let permission = commands[name].permissions;
                if (await checkPermission(permission, data, send)) {

                }
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