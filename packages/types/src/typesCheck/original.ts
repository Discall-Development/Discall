/* eslint-disable quotes */
type CheckerValue<F> = F extends (obj: unknown) => obj is infer T ? T : F extends unknown[] ? CheckerArrayValues<F> : never;
type CheckerArrayValues<F> = F extends [infer T, ...infer U] ? [CheckerValue<T>, ...CheckerArrayValues<U>] : [];

export function isNumber(obj: unknown): obj is number {
    return typeof obj === 'number';
}

export function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}

export function isBoolean(obj: unknown): obj is boolean {
    return typeof obj === 'boolean';
}

export function isFunction(obj: unknown): obj is (...arg: unknown[]) => unknown {
    return typeof obj === 'function';
}

export function isTypeNull<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is CheckerValue<T> | null {
    return function(obj: unknown): obj is CheckerValue<T> | null {
        return isUnion(isLiteral(null), cb)(obj);
    };
} 

export function isTypeArray<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is Array<CheckerValue<T>> {
    return function(obj: unknown): obj is Array<CheckerValue<T>> {
        return Array.isArray(obj) && obj.every(cb);
    };
}

export function isTypeTuple<T extends ((obj: unknown) => boolean)[]>(...cbs: T): (obj: unknown) => obj is CheckerValue<T> {
    return function(obj: unknown): obj is CheckerValue<T> {
        return Array.isArray(obj) && obj.length === cbs.length && obj.every((v, idx) => cbs[idx](v));
    };
}

export function isTypeRecord<T extends [(obj: unknown) => obj is string | number | symbol, (obj: unknown) => boolean]>(...pair: T): (obj: unknown) => obj is Record<CheckerValue<typeof pair[0]>, CheckerValue<typeof pair[1]>> {
    return function(obj: unknown): obj is Record<CheckerValue<typeof pair[0]>, CheckerValue<typeof pair[1]>> {
        return Object.entries(obj as Record<string, unknown>).every(([key, value]) => {
            return pair[0](pair[0](0) ? Number(key) : key) && pair[1](value);
        });
    };
}

export function isTypeObject<T extends Record<string, (obj: unknown) => boolean>>(pairs: T): (obj: unknown) => obj is { [P in keyof typeof pairs]: CheckerValue<typeof pairs[P]> } {
    return function(obj: unknown): obj is { [P in keyof typeof pairs]: CheckerValue<typeof pairs[P]> } {
        return !!obj && Object.keys(pairs).every(v => pairs[v]((obj as Record<string, unknown>)[v]));
    };
}

export function isTypeUndefined<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is CheckerValue<T> | undefined {
    return function(obj: unknown): obj is CheckerValue<T> | undefined {
        return isUnion(isLiteral(undefined), cb)(obj);
    };
}

export function isUnion<T extends ((obj: unknown) => boolean)[]>(...cbs: T): (obj: unknown) => obj is CheckerValue<T>[number] {
    return function(obj: unknown): obj is CheckerValue<T>[number] {
        return cbs.some(v => v(obj));
    };
}

export function isLiteral<T extends string | number | boolean | null | undefined | Record<string, unknown> | Array<unknown>>(value: T): (obj: unknown) => obj is typeof value {
    return function(obj: unknown): obj is typeof value {
        return obj === value;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAny(obj: unknown): obj is any {
    return obj ? !!obj : !obj;
}