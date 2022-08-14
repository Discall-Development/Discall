export default function isEmpty(obj: unknown, seenObjects?: Map<unknown, unknown>) {
    seenObjects = seenObjects || new Map();
    seenObjects.set(obj, undefined);

    if (['boolean', 'function', 'number'].includes(typeof obj))
        return false;

    if (typeof obj !== 'object')
        return !obj;

    const emptys: unknown[] = [];
    for (const prop of Object.values(obj as object)) {
        if (!seenObjects.has(prop))
            seenObjects.set(prop, isEmpty(prop, seenObjects));
        emptys.push(seenObjects.get(prop));
    }

    return !emptys.includes(false);
}