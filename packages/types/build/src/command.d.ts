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
export declare enum CommandPermissionsFlag {
    OWNER = 1,
    ADMINISTRATOR = 2,
    BOT = 4,
    ROLE = 8,
    MEMBER = 16,
    GROUP = 32,
    USER = 64
}
