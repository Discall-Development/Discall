"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caches = exports.get = void 0;
const get_1 = __importDefault(require("./get"));
exports.get = get_1.default;
const cache_1 = __importDefault(require("./cache"));
exports.caches = cache_1.default;
