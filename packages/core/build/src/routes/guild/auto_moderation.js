"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function autoModeration(arg_1, arg_2 = {}, arg_3) {
    if (arg_3 && (0, types_1.isSnowflake)(arg_3))
        return {
            type: 'id',
            data: {
                moderation_id: arg_3,
                data: autoModeration(arg_1, arg_2)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1, param_2) => autoModeration(param_1, param_2, arg_1));
    if ((0, types_1.isHttpRequestData)(arg_1))
        return {
            type: 'moderation',
            data: arg_1
        };
    return {
        type: 'moderation',
        data: { ...arg_1, ...arg_2 }
    };
}
exports.default = autoModeration;
