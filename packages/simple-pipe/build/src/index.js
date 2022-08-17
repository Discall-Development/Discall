"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeline = void 0;
function pipechain(value) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const functions = [];
    const params = [];
    let promise = false;
    function execute() {
        if (promise)
            return functions.reduce((p, c, idx) => {
                if (p instanceof Promise)
                    return p.then((v) => c(v, ...params[idx]));
                return c(p, ...params[idx]);
            }, value);
        return functions.reduce((p, c, idx) => c(p, ...params[idx]), value);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function pipe(func, ...param) {
        if (!promise && isPromise(func))
            promise = true;
        functions.push(func);
        params.push(param);
        return {
            execute,
            pipe
        };
    }
    return { execute, pipe: pipe };
}
exports.default = pipechain;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pipeline(...funcs) {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        execute: (value) => funcs.reduce((p, c) => {
            let f, ps;
            if (Array.isArray(c))
                f = c[0], ps = c.slice(1);
            else
                f = c, ps = [];
            if (p instanceof Promise)
                return p.then((v) => f(v, ...ps));
            return f(p, ...ps);
        }, value)
    };
}
exports.pipeline = pipeline;
function isPromise(func) {
    if (func.constructor.name === 'AsyncFunction' && func().catch((_) => _) instanceof Promise)
        return true;
    return false;
}
