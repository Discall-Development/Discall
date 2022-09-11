"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
const utils_1 = require("../../utils");
function member(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                thread_id: arg_2,
                data: member(arg_1)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1) => member(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'member',
            data: arg_1
        };
    return {
        type: 'member',
        data: {
            query: (0, utils_1.isEmpty)(arg_1) ? '' : `?${Object.entries(arg_1).map(([key, value]) => {
                return `${key}=${value}`;
            }).join('&')}`
        }
    };
}
exports.default = member;
