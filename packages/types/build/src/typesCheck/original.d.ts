declare type CheckerValue<F> = F extends (obj: unknown) => obj is infer T ? T : F extends unknown[] ? CheckerArrayValues<F> : never;
declare type CheckerArrayValues<F> = F extends [infer T, ...infer U] ? [CheckerValue<T>, ...CheckerArrayValues<U>] : [];
export declare function isNumber(obj: unknown): obj is number;
export declare function isString(obj: unknown): obj is string;
export declare function isBoolean(obj: unknown): obj is boolean;
export declare function isFunction(obj: unknown): obj is (...arg: unknown[]) => unknown;
export declare function isTypeNull<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is CheckerValue<T> | null;
export declare function isTypeArray<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is Array<CheckerValue<T>>;
export declare function isTypeTuple<T extends ((obj: unknown) => boolean)[]>(...cbs: T): (obj: unknown) => obj is CheckerValue<T>;
export declare function isTypeRecord<T extends [(obj: unknown) => obj is string | number | symbol, (obj: unknown) => boolean]>(...pair: T): (obj: unknown) => obj is Record<CheckerValue<typeof pair[0]>, CheckerValue<typeof pair[1]>>;
export declare function isTypeObject<T extends Record<string, (obj: unknown) => boolean>>(pairs: T): (obj: unknown) => obj is {
    [P in keyof typeof pairs]: CheckerValue<typeof pairs[P]>;
};
export declare function isTypeUndefined<T extends (obj: unknown) => boolean>(cb: T): (obj: unknown) => obj is CheckerValue<T> | undefined;
export declare function isUnion<T extends ((obj: unknown) => boolean)[]>(...cbs: T): (obj: unknown) => obj is CheckerValue<T>[number];
export declare function isLiteral<T extends string | number | boolean | null | Record<string, unknown> | Array<unknown>>(value: T): (obj: unknown) => obj is typeof value;
export declare function isAny(obj: unknown): obj is any;
export {};
