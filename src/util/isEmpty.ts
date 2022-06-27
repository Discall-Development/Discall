export default function isEmpty(obj: any, seenObjects?: Map<any, any>) {
    seenObjects = seenObjects || new Map();
    seenObjects.set(obj, undefined);

    if (["boolean", "function", "number"].includes(typeof obj))
        return false;

    if (typeof obj !== 'object')
        return !obj;

    let emptys: any[] = [];
    for (const prop of Object.values(obj)) {
        if (!seenObjects.has(prop))
            seenObjects.set(prop, isEmpty(prop, seenObjects));
        emptys.push(seenObjects.get(prop));
    }

    return !emptys.includes(false);
}