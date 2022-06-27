export default function isCircular(obj: any, parents?: any[]): boolean {
    let parent = parents || [obj];
    for (const prop of Object.values(obj))
        if (typeof prop === 'object')
            for (const par of parent)
                if (par === prop)
                    return true;

    return false;
}