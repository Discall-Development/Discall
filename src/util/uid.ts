let uid = 0n;
let uids: Record<string, bigint[]> = {};
export function createUID(name: string): string {
    if (!uids[name])
        uids[name] = [uid];
    else
        uids[name].push(uid);
        
    return `${uid++}-${name}`;
}

export function getUIDs(name: string): string[] {
    return uids[name] ? uids[name].map(x => `${x}-${name}`) : [];
}