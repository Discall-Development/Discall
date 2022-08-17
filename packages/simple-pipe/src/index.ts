// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(
    func: X,
    ...params: P
) => {
    execute: () => Promise<ReturnType<X>>;
    pipe: Pipe;
};

type Length<T extends unknown[]> = T extends { length: infer L extends number } ? L : 0;
type LastFunction<F extends (((...args: unknown[]) => unknown) | ((...args: unknown[]) => unknown)[])[]> = F extends [arg: unknown, ...rest: infer U] ? F[Length<U>] : F[0];
type FunctionReturnType<F extends ((...args: unknown[]) => unknown) | [(...args: unknown[]) => unknown, ...unknown[]]> = F extends [arg: infer T extends (...args: unknown[]) => unknown, ...rest: unknown[]] ? ReturnType<T> : F extends (...args: unknown[]) => unknown ? ReturnType<F> : never;

export default function pipechain<T>(value: T): {
    execute: () => Promise<T> | T;
    pipe: Pipe;
} {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const functions: ((...args: any[]) => any)[] = [];
    const params: Array<unknown>[] = [];
    let promise = false;

    function execute() {
        if (promise)
            return functions.reduce((p: T | Promise<T>, c, idx) => {
                if (p instanceof Promise)
                    return p.then((v: T) => c(v, ...params[idx]));
                return c(p, ...params[idx]);
            }, value);
        return functions.reduce((p, c, idx) => c(p, ...params[idx]), value);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function pipe<X extends (...args: any[]) => ReturnType<X>, P extends T[]>(func: X, ...param: P) {
        if (!promise && isPromise(func))
            promise = true;

        functions.push(func);
        params.push(param);
        return {
            execute,
            pipe
        };
    }

    return { execute, pipe: pipe as unknown as Pipe };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipeline<T extends (((...args: any[]) => any) | [((...args: any[]) => any), ...any[]])[]>(...funcs: T): {
    execute: (value: unknown) => Promise<FunctionReturnType<LastFunction<T>>> | FunctionReturnType<LastFunction<T>>;
} {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        execute: (value: any) => funcs.reduce((p, c) => {
            let f: (...args: unknown[]) => unknown, ps: unknown[];
            if (Array.isArray(c))
                f = c[0], ps = c.slice(1);
            else
                f = c, ps = [];

            if (p instanceof Promise)
                return p.then((v: unknown) => f(v, ...ps));
            return f(p, ...ps);
        }, value)
    };
}

function isPromise(func: (() => Promise<unknown> | unknown)) {
    if (func.constructor.name === 'AsyncFunction' && (func() as Promise<unknown>).catch((_: unknown) => _) instanceof Promise)
        return true;

    return false;
}