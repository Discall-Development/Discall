"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function thread(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isString)(arg_2))
        return {
            type: arg_2,
            data: { ...thread(arg_1) }
        };
    if (arg_1 === 'active' || arg_1 === 'public' || arg_1 === 'private' || arg_1 === 'joined')
        return ((param_1) => thread(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'thread',
            data: arg_1
        };
    return {
        type: 'thread',
        data: { ...arg_1 }
    };
}
exports.default = thread;
