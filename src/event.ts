let Global: {
    events: { [k: string]: ((...item: any) => Promise<any>)[] };
} = {
    events: {}
}
export function packEvent(eventName: string): (cb: () => Promise<any>) => any {
    return function(cb: () => Promise<any>): any {
        if (Array.isArray(Global.events[eventName]))
            Global.events[eventName].push(cb);
        else
            Global.events[eventName] = [cb];
    };
}

export async function callEvent(eventName: string, data: any) {
    for (const cb of Global.events[eventName.toLowerCase()]) {
        await cb(data);
    }
}