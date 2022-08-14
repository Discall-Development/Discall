"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importStar(require(".."));
const map = function (arr, cb) {
    return arr.map(cb);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function promiseTest(arr) {
    return new Promise((resolve) => {
        const iter = arr[Symbol.iterator]();
        setInterval(function _() {
            const obj = iter.next();
            if (obj.done)
                resolve(arr);
        }, 100);
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function asyncTest(arr) {
    return arr;
}
console.log(await (0, __1.default)([1, 2, 3])
    .pipe(map, (v) => v * 2)
    .pipe(promiseTest)
    .pipe(asyncTest)
    .pipe((arr) => [...arr, 40])
    .execute());
console.log(await (0, __1.pipeline)([map, (v) => v * 2], promiseTest, asyncTest, (arr) => [...arr, 40]).execute([1, 2, 3]));
