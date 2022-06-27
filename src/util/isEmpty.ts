import isCircular from "./isCircular";

export default function isEmpty(obj: any): boolean {
    if (['boolean', 'function'].includes(typeof obj))
        return false;

    if (typeof obj !== 'object')
        return !obj;

    for (const prop of Object.values(obj)) {
        if (isCircular(prop))
            continue;

        if (!isEmpty(prop))
            return false;
    }
    return true;
}