import { EventData, Event, Opcode } from "./typo";
import _ws from "./ws";

let events: Record<string, Event<any>[]> = {}

let registered = false;
export default function listener(ws: ReturnType<typeof _ws>) {
    if (registered)
        return ws;

    let onMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        let data = await onMessage(event);
        if (data.op !== Opcode.Dispatch)
            return data;

        let eventName = data.t?.toLowerCase()
        if (events[eventName])
            for (const event of events[eventName]) {
                if (event.check(data)) {
                    await event.listen(data);
                    if (event.remove)
                        events[eventName] = events[eventName].filter(v => v !== event);
                }
            }
    }

    registered = true;
    return ws;
}

export function addRemoveable<T extends EventData>({
    name, listener, check
}: {
    name: string;
    listener: (data: T) => Promise<void>;
    check: (data: T) => boolean;
}): Event<T> {
    let event: Event<T> = {
        remove: true,
        listen: listener,
        check: check
    };
    events[name] = events[name] ? [...event[name], event] : [event];

    return event;
}

export function register<T extends EventData>({
    name, listener, check
}: {
    name: string;
    listener: (data: T) => Promise<void>;
    check?: (data: T) => boolean;
}): Event<T> {
    let event: Event<T> = {
        remove: false,
        listen: listener,
        check: check || (_ => true)
    };
    events[name] = events[name] ? [...event[name], event] : [event];

    return event;
}