import { MessageCreateEventData } from "./event";

export interface Command<T extends (v: any) => any> {
    name: string;
    run: (data: MessageCreateEventData, ...args: ReturnType<T>[]) => Promise<void>;
    convertors?: T[];
    permissions?: CommandPermissionsFlag;
    description?: string;
    aliases?: string[];
    help?: string;
}

export enum CommandPermissionsFlag {
    OWNER = 1 << 0,
    ADMINISTRATOR = 1 << 1,
    BOT = 1 << 2,
    ROLE = 1 << 3,
    MEMBER = 1 << 4,
    GROUP = 1 << 5,
    USER = 1 << 6
}