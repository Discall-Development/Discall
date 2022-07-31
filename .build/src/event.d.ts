import { EventData, Event } from "./typo";
import _ws from "./ws";
export default function listener(ws: ReturnType<typeof _ws>): ReturnType<typeof _ws>;
export declare function addRemoveable<T extends EventData>({ name, listener, check }: {
    name: string;
    listener: (data: T) => Promise<void>;
    check: (data: T) => boolean;
}): Event<T>;
export declare function register<T extends EventData>({ name, listener, check }: {
    name: string;
    listener: (data: T) => Promise<void>;
    check?: (data: T) => boolean;
}): Event<T>;
