"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
const error_1 = require("./error");
const utils_1 = require("./utils");
function guild(arg_1, arg_2 = {}, arg_3) {
    if (arg_3 && (0, types_1.isSnowflake)(arg_3))
        return {
            type: 'id',
            data: {
                guild_id: arg_3,
                data: guild(arg_1, arg_2)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1, param_2) => guild(param_1, param_2, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'guild',
            data: arg_1
        };
    if ((0, utils_1.isEmpty)(arg_1))
        throw new error_1.EmptyError('guild');
    return {
        type: 'channel',
        data: { ...arg_1, ...arg_2 }
    };
}
exports.default = guild;
