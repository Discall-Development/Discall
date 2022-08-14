import { EventData, Event, Opcode, EventName } from '@discall/types';
import _ws from './ws';

const events: Record<string, Event<EventData>[]> = {};

let registered = false;
export default function listener(ws: ReturnType<typeof _ws>): ReturnType<typeof _ws> {
    if (registered)
        return ws;

    const onMessage = ws.onmessage;
    const onClose = ws.onclose;
    ws.onmessage = async (event) => {
        const data = await onMessage(event);
        if (data.op !== Opcode.Dispatch)
            return data;

        const eventName = data.t as string;
        if (events[eventName])
            for (const event of events[eventName]) {
                if (event.check(data.d as EventData)) {
                    await event.listen(data.d as EventData);
                    if (event.remove)
                        events[eventName] = events[eventName].filter(v => v !== event);
                }
            }

        return data;
    };

    ws.onclose = async (event) => {
        const ws = await onClose(event);
        registered = false;

        return listener(ws);
    };

    registered = true;
    return ws;
}

export function addRemoveable<T extends EventData, N extends keyof typeof EventName>({
    name, listener, check
}: {
    name: N | typeof EventName[N];
    listener: (data: T) => Promise<void>;
    check: (data: T) => boolean;
}): Event<T> {
    const event: Event<T> = {
        remove: true,
        listen: listener,
        check: check
    };
    if (EventName[name as N] !== undefined)
        name = EventName[name as N];
    
    events[name] = events[name] ? [...events[name], event as Event<EventData>] : [event as Event<EventData>];
    return event;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
export function register<N extends keyof typeof EventName>(...event: {
    name: N | typeof EventName[N];
    listener: AnyFunction;
    check?: AnyFunction;
}[]): Event<EventData>[] {
    const _events: Event<EventData>[] = [];
    for (const e of event) {
        let { name } = e;
        const { listener, check } = e;
        
        const event: Event<EventData> = {
            remove: false,
            listen: listener,
            check: check || (() => true)
        };
        if (EventName[name as N] !== undefined)
            name = EventName[name as N];
    
        events[name] = events[name] ? [...events[name], event] : [event];
        _events.push(event);
    }

    return _events;
}