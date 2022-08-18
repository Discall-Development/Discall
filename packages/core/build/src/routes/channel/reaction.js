"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
const utils_1 = require("../../utils");
function reaction(arg_1, arg_2) {
    if (arg_2 && (0, types_1.isSnowflake)(arg_2))
        return {
            type: 'id',
            data: {
                user_id: arg_2,
                data: reaction(arg_1)
            }
        };
    if (arg_2 && arg_2 === 'bot')
        return {
            type: 'bot',
            data: {
                data: reaction(arg_1)
            }
        };
    if ((0, types_1.isSnowflake)(arg_1))
        return ((param_1) => reaction(param_1, arg_1));
    if ((0, types_1.isEmoji)(arg_1) && (0, types_1.isTypeUndefined)((0, types_1.isLiteral)(null))(arg_1.id) && arg_1.name)
        return {
            type: 'reaction',
            data: {
                emoji: decodeURIComponent(arg_1.name)
            }
        };
    if ((0, types_1.isString)(arg_1))
        return {
            type: 'reaction',
            data: {
                emoji: decodeURIComponent(arg_1)
            }
        };
    if ((0, types_1.isEmoji)(arg_1))
        return {
            type: 'reaction',
            data: {
                emoji: `${arg_1.name}:${arg_1.id}`
            }
        };
    if ((0, utils_1.isEmpty)(arg_1))
        return {
            type: 'reaction',
            data: {
                query: ''
            }
        };
    return {
        type: 'reaction',
        data: {
            query: `?${Object.entries(arg_1).map(([key, value]) => {
                return `${key}=${value}`;
            }).join('&')}`
        }
    };
}
exports.default = reaction;
