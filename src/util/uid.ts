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

export function deleteUID(uid: string): boolean {
    let name = uid.split("-")[1];
    if (!uids[name])
        return false;

    let index = uids[name].indexOf(BigInt(uid.split("-")[0]));
    if (index === -1)
        return false;
;
    return uids[name].splice(index, 1) && true;
}