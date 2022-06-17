import chalk from "chalk";

const debug = chalk.hex("#FFA500");
const error = chalk.red;
const warn = chalk.yellow;
const log = chalk.blue;

export function debug(message: string) {
  console.log(debug("[DEBUG]:", message));
}

export function error(message: string) {
  console.log(error("[ERROR]:", message));
}

export function warn(message: string) {
  console.log(warn("[WARN]:", message));
}

export function message(message: string) {
  console.log(log("[LOG]:", message));
}
