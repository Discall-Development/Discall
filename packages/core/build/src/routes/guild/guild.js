"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
const utils_1 = require("../../utils");
function isGetGuildFilters(obj) {
    return (0, types_1.isTypeObject)({
        with_counts: (0, types_1.isTypeUndefined)(types_1.isBoolean)
    })(obj);
}
function guild(arg_1, arg_2) {
    if ((0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                guild_id: arg_2,
                data: guild(arg_1)
            }
        };
    if (arg_2 === 'preview')
        return {
            type: arg_2,
            data: {}
        };
    if (arg_1 === 'preview' || (0, types_1.isSnowflake)(arg_1))
        return ((param_1) => guild(param_1, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'guild',
            data: arg_1
        };
    if (isGetGuildFilters(arg_1))
        return {
            type: 'message',
            data: {
                query: (0, utils_1.isEmpty)(arg_1) ? '' : `?${Object.entries(arg_1).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')}`
            }
        };
    return {
        type: 'channel',
        data: { ...arg_1 }
    };
}
exports.default = guild;
