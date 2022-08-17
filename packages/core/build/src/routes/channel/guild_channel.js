"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function channel(arg_1, arg_2 = {}, arg_3) {
    if (arg_3 && (0, types_1.isSnowflake)(arg_3))
        return {
            type: 'id',
            data: {
                channel_id: arg_3,
                data: channel(arg_1, arg_2)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1, param_2) => channel(param_1, param_2, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'channel',
            data: arg_1
        };
    return {
        type: 'channel',
        data: { ...arg_1, ...arg_2 }
    };
}
exports.default = channel;
