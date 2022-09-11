"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
function emoji(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                emoji_id: arg_2,
                data: emoji(arg_1)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1) => emoji(param_1, arg_1));
    return {
        type: 'emoji',
        data: { ...arg_1 }
    };
}
exports.default = emoji;
