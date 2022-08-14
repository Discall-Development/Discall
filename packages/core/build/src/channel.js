"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function channel(arg_1, arg_2) {
    if (typeof arg_1 === 'string')
        return function (param_1, param_2) {
            if ((0, types_1.isHttpRequestData)(param_1))
                return {
                    type: 'id',
                    data: {
                        channel_id: arg_1,
                        data: param_1
                    }
                };
            if (!(0, types_1.isAny)(param_1))
                return {
                    type: 'channel+info',
                    data: {}
                };
            return {
                type: 'channel+id',
                data: {
                    channel_id: arg_1,
                    data: channel(param_1, param_2)
                }
            };
        };
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
