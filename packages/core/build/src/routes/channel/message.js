"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pins = void 0;
const types_1 = require("@discall/types");
function message(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                message_id: arg_2,
                data: message(arg_1)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1) => message(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'message',
            data: arg_1
        };
    return {
        type: 'message',
        data: { ...arg_1 }
    };
}
exports.default = message;
function pins(arg_1) {
    return {
        type: 'pins',
        data: {
            message_id: arg_1,
            data: {}
        }
    };
}
exports.pins = pins;
