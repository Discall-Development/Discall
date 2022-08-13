type CheckerValue<F> = F extends (obj: any) => obj is infer T ? T : F extends any[] ? CheckerArrayValues<F> : never;
type CheckerArrayValues<F> = F extends [infer T, ...infer U] ? [CheckerValue<T>, ...CheckerArrayValues<U>] : [];

export function isNumber(obj: any): obj is number {
    return typeof obj === "number";
}

export function isString(obj: any): obj is string {
    return typeof obj === "string";
}

export function isBoolean(obj: any): obj is boolean {
    return typeof obj === "boolean";
}

export function isTypeNull<T extends (obj: any) => boolean>(cb: T): (obj: any) => obj is CheckerValue<T> | null {
    return function(obj: any): obj is CheckerValue<T> | null {
        return cb(obj) || obj === null;
    };
} 

export function isTypeArray<T extends (obj: any) => boolean>(cb: T): (obj: any) => obj is Array<CheckerValue<T>> {
    return function(obj: any): obj is Array<CheckerValue<T>> {
        return Array.isArray(obj) && obj.every(cb);
    };
}

export function isTypeTuple<T extends any[]>(...cbs: T): (obj: any) => obj is CheckerValue<T> {
    return function(obj: any): obj is CheckerValue<T> {
        return Array.isArray(obj) && obj.every((v, idx) => cbs[idx](v));
    };
}

export function isTypeObject<T extends Record<string, (obj: any) => boolean>>(pairs: T): (obj: any) => obj is { [P in keyof typeof pairs]: CheckerValue<typeof pairs[P]> } {
    return function(obj: any): obj is { [P in keyof typeof pairs]: CheckerValue<typeof pairs[P]> } {
        return Object.keys(pairs).every(v => pairs[v](obj[v]));
    }
}

export function isTypeUndefined<T extends (obj: any) => boolean>(cb: T): (obj: any) => obj is CheckerValue<T> | undefined {
    return function(obj: any): obj is CheckerValue<T> | undefined {
        return obj === undefined || cb(obj);
    }
}

export function isUnion<T extends any[]>(...cbs: T): (obj: any) => obj is CheckerValue<T>[number] {
    return function(obj: any): obj is CheckerValue<T>[number] {
        return cbs.some(v => v(obj));
    };
}

export function isLiteral<T extends any>(value: T): (obj: any) => obj is typeof value {
    return function(obj: any): obj is typeof value {
        return obj === value;
    }
}

export function isAny(obj: any): obj is any {
    return obj !== undefined;
}
