let _debug: (...data: string[]) => string;
let _error: (...data: string[]) => string;
let _warn: (...data: string[]) => string;
let _log: (...data: string[]) => string;

void (async () => {
    let { Chalk } = await import('chalk');
    let chalk = new Chalk();

    _debug = chalk.bgGreen.hex("#FFA500");
    _error = chalk.bgYellow.red;
    _warn = chalk.bgRed.yellow;
    _log = chalk.bold.blue;
})();

export function debug(message: string) {
    console.log(_debug("[DEBUG]:", message));
}

export function error(message: string) {
    console.log(_error("[ERROR]:", message));
}

export function warn(message: string) {
    console.log(_warn("[WARN]:", message));
}

export function message(message: string) {
    console.log(_log("[LOG]:", message));
}