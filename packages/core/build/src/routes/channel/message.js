"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pins = void 0;
const types_1 = require("@discall/types");
const utils_1 = require("../../utils");
function isGetMessageFilters(obj) {
    return (0, types_1.isTypeObject)({
        around: (0, types_1.isTypeUndefined)(types_1.isSnowflake),
        before: (0, types_1.isTypeUndefined)(types_1.isSnowflake),
        after: (0, types_1.isTypeUndefined)(types_1.isSnowflake),
        limit: (0, types_1.isTypeUndefined)(types_1.isNumber)
    })(obj);
}
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
    if (isGetMessageFilters(arg_1))
        return {
            type: 'message',
            data: {
                query: (0, utils_1.isEmpty)(arg_1) ? '' : `?${Object.entries(arg_1).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')}`
            }
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
