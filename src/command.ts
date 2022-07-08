import * as EventEmitter from "events";
import { DCommand, DCommandChannel, DCommandOption, MessageCreateEventData } from "./dataType";
import { packEvent } from "./event";
import { createUID } from "./util/uid";

let commands: Record<string, DCommand> = {};
let channels: Record<string, DCommandChannel> = {};
let channelQueues: Record<string, DCommandChannel[]> = {};
let channelDatas: Record<string, Record<string, any>> = {};

let channelTimeout = 0;
export function createCommand(name: string, run: (...args: any[]) => Promise<any>, option: DCommandOption, permissions: number): DCommand {
    channelQueues[name] = [];

    let emitter = new EventEmitter();
    channelDatas[name] = {};

    async function send(...args: any[]) {
        channelDatas[name][createUID(name)] = args;
    }

    async function getCommandData(name: string) {
        if (channelDatas[name]) {
            return channelDatas[name].shift();
        }

        let reted = false;
    }

    let channel: DCommandChannel = {
        send, getCommandData,
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

export function setupHandler(prefix: string, timeout: number = 0) {
    channelTimeout = timeout;
    packEvent("message_create")(async (data: MessageCreateEventData) => {
        let content = data.content;
        let params = content.trim().split(/ +/g);

        if (params[0].startsWith(prefix)) {
            let name = params[0].slice(prefix.length);
            if (!commands[name]) return;   
            
            await commands[name].run(channels[name], ...params.slice(1));
        }
    });
}