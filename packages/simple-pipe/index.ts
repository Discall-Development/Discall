type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(
    func: X,
    ...params: P
) => {
    execute: () => Promise<ReturnType<X>>;
    pipe: Pipe;
};

type Length<T extends any[]> = T extends { length: infer L extends number } ? L : 0;
type LastFunction<F extends (((...args: any[]) => any) | ((...args: any[]) => any)[])[]> = F extends [arg: any, ...rest: infer U] ? F[Length<U>] : F[0];
type FunctionReturnType<F extends ((...args: any[]) => any) | [(...args: any) => any, ...any[]]> = F extends [arg: infer T extends (...args: any[]) => any, ...rest: any[]] ? ReturnType<T> : F extends (...args: any[]) => any ? ReturnType<F> : never;

export default function pipechain<T>(value: T): {
    execute: () => Promise<T> | T;
    pipe: Pipe;
} {
    let functions: (((...args: any[]) => any) | ((...args: any[]) => Promise<any>))[] = [];
    let params: Array<any>[] = [];
    let promise: boolean = false;

    function execute() {
        if (promise)
            return functions.reduce((p: T | Promise<T>, c, idx) => {
                if (p instanceof Promise)
                    return p.then((v: T) => c(v, ...params[idx]));
                return c(p, ...params[idx]);
            }, value);
        return functions.reduce((p, c, idx) => c(p, ...params[idx]), value);
    }

    function pipe<X extends (...args: any[]) => ReturnType<X>, P extends T[]>(func: X, ...param: P) {
        if (!promise && isPromise(func))
            promise = true;

        functions.push(func);
        params.push(param);
        return {
            execute,
            pipe
        };
    };

    return { execute, pipe: pipe as Pipe };
}

export function pipeline<T extends (((...args: any[]) => any) | [((...args: any[]) => any), ...any[]])[]>(...funcs: T): {
    execute: (value: any) => Promise<FunctionReturnType<LastFunction<T>>> | FunctionReturnType<LastFunction<T>>;
} {
    return {
        execute: (value: any) => funcs.reduce((p, c) => {
            let f: (...args: any[]) => any, ps: any[];
            if (Array.isArray(c))
                f = c[0], ps = c.slice(1);
            else
                f = c, ps = [];

            if (p instanceof Promise)
                return p.then((v: any) => f(v, ...ps));
            return f(p, ...ps);
        }, value)
    }
}

function isPromise(func: any) {
    if (func.constructor.name === "AsyncFunction" && func().catch((_: any) => _) instanceof Promise)
        return true;

    return false;
}