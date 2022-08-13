declare type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(func: X, ...params: P) => {
    execute: () => Promise<ReturnType<X>>;
    pipe: Pipe;
};
declare type Length<T extends any[]> = T extends {
    length: infer L extends number;
} ? L : 0;
declare type LastFunction<F extends (((...args: any[]) => any) | ((...args: any[]) => any)[])[]> = F extends [arg: any, ...rest: infer U] ? F[Length<U>] : F[0];
declare type FunctionReturnType<F extends ((...args: any[]) => any) | [(...args: any) => any, ...any[]]> = F extends [arg: infer T extends (...args: any[]) => any, ...rest: any[]] ? ReturnType<T> : F extends (...args: any[]) => any ? ReturnType<F> : never;
export default function pipechain<T>(value: T): {
    execute: () => Promise<T> | T;
    pipe: Pipe;
};
export declare function pipeline<T extends (((...args: any[]) => any) | [((...args: any[]) => any), ...any[]])[]>(...funcs: T): {
    execute: (value: any) => Promise<FunctionReturnType<LastFunction<T>>> | FunctionReturnType<LastFunction<T>>;
};
export {};
