"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function invite(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isString)(arg_2))
        return {
            type: 'code',
            data: {
                code: arg_2,
                data: invite(arg_1)
            }
        };
    if ((0, types_1.isString)(arg_1))
        return ((param_1) => invite(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'invite',
            data: arg_1
        };
    return {
        type: 'invite',
        data: { ...arg_1 }
    };
}
exports.default = invite;
