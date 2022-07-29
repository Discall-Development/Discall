export function isNode() {
    if (globalThis.process && globalThis.process.versions.v8)
        return true;
    return false;
}

export function isBun() {
    if (globalThis.process && globalThis.process.versions.bun)
        return true;
    return false;
}

export function isDeno() {
    if (!globalThis.process && globalThis.Deno !== undefined)
        return true;
    return false;
}