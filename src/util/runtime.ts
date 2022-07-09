export function isBun() {
    if (typeof Bun !== "undefined")
        return true;
    return false;
}

export function isNode() {
    if (typeof process !== "undefined" && !isBun())
        return true;
    return false;
}

export function isBrowser() {
    if (typeof window !== "undefined")
        return true;
    return false;
}

export function isDeno() {
    if (typeof Deno !== "undefined")
        return true;
    return false;
}