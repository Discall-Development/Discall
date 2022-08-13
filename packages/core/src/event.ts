import { EventData, Event, Opcode, EventName } from "@discall/types";
import _ws from "./ws";

let events: Record<string, Event<any>[]> = {}

let registered = false;
export default function listener(ws: ReturnType<typeof _ws>): ReturnType<typeof _ws> {
    if (registered)
        return ws;

    let onMessage = ws.onmessage;
    let onClose = ws.onclose;
    ws.onmessage = async (event) => {
        let data = await onMessage(event);
        if (data.op !== Opcode.Dispatch)
            return data;

        let eventName = data.t as string;
        if (events[eventName])
            for (const event of events[eventName]) {
                if (event.check(data.d)) {
                    await event.listen(data.d);
                    if (event.remove)
                        events[eventName] = events[eventName].filter(v => v !== event);
                }
            }

        return data;
    }

    ws.onclose = async (event) => {
        let ws = await onClose(event);
        registered = false;

        return listener(ws);
    }

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
    let event: Event<T> = {
        remove: true,
        listen: listener,
        check: check
    };
    if (EventName[name as N] !== undefined)
        name = EventName[name as N];
    
    events[name] = events[name] ? [...events[name], event] : [event];
    return event;
}

export function register<N extends keyof typeof EventName>(...event: {
    name: N | typeof EventName[N];
    listener: (data: any) => Promise<void>;
    check?: (data: any) => boolean;
}[]): Event<EventData>[] {
    let _events: Event<EventData>[] = [];
    for (let { name, listener, check } of event) {
        let event: Event<EventData> = {
            remove: false,
            listen: listener,
            check: check || (_ => true)
        };
        if (EventName[name as N] !== undefined)
            name = EventName[name as N];
    
        events[name] = events[name] ? [...events[name], event] : [event];
        _events.push(event);
    }

    return _events;
}