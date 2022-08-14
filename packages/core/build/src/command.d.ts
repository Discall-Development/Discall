import { Command, CommandPermissionsFlag, MessageCreateEventData, SnowflakeData } from '@discall/types';
import _ws from './ws';
export default function commander(ws: ReturnType<typeof _ws>, prefix: string): ReturnType<typeof _ws>;
export declare function addCommand<T extends (v: unknown) => unknown>(command: {
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
    };
}): Command<T>;
