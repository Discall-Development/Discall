declare type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(func: X, ...params: P) => {
    execute: () => Promise<ReturnType<X>>;
    pipe: Pipe;
};
declare type Length<T extends unknown[]> = T extends {
    length: infer L extends number;
} ? L : 0;
declare type LastFunction<F extends (((...args: unknown[]) => unknown) | ((...args: unknown[]) => unknown)[])[]> = F extends [arg: unknown, ...rest: infer U] ? F[Length<U>] : F[0];
declare type FunctionReturnType<F extends ((...args: unknown[]) => unknown) | [(...args: unknown[]) => unknown, ...unknown[]]> = F extends [arg: infer T extends (...args: unknown[]) => unknown, ...rest: unknown[]] ? ReturnType<T> : F extends (...args: unknown[]) => unknown ? ReturnType<F> : never;
export default function pipechain<T>(value: T): {
    execute: () => Promise<T> | T;
    pipe: Pipe;
};
export declare function pipeline<T extends (((...args: any[]) => any) | [((...args: any[]) => any), ...any[]])[]>(...funcs: T): {
    execute: (value: unknown) => Promise<FunctionReturnType<LastFunction<T>>> | FunctionReturnType<LastFunction<T>>;
};
export {};
