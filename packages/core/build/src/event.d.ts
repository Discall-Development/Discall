import { EventData, Event, EventName } from '@discall/types';
import _ws from './ws';
export default function listener(ws: ReturnType<typeof _ws>): ReturnType<typeof _ws>;
export declare function addRemoveable<T extends EventData, N extends keyof typeof EventName>({ name, listener, check }: {
    name: N | typeof EventName[N];
    listener: (data: T) => Promise<void>;
    check: (data: T) => boolean;
}): Event<T>;
declare type AnyFunction = (...args: any[]) => any;
export declare function register<N extends keyof typeof EventName>(...event: {
    name: N | typeof EventName[N];
    listener: AnyFunction;
    check?: AnyFunction;
}[]): Event<EventData>[];
export {};
