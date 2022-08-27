"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function channel(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                channel_id: arg_2,
                data: channel(arg_1)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1) => channel(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'channel',
            data: arg_1
        };
    if (!arg_1)
        return {
            type: 'channel+empty',
            data: {}
        };
    return {
        type: 'channel',
        data: { ...arg_1 }
    };
}
exports.default = channel;
