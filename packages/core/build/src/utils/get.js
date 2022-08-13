"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importDefault(require("./cache"));
function getCache(type, param) {
    if (typeof param === "function")
        return [...(cache_1.default[type].values())].filter(v => param(v));
    if (cache_1.default[type].has(param))
        return cache_1.default[type].get(param);
}
exports.default = getCache;
