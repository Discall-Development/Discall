"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@discall/types");
const error_1 = require("../../error");
const utils_1 = require("../../utils");
function reaction(arg_1, arg_2, arg_3, arg_4) {
    console.log(arg_1, arg_2, arg_3, arg_4);
    if (arg_1 !== 'bot' && arg_1 !== 'all' && !(0, types_1.isSnowflake)(arg_1) && (!arg_3 && typeof arg_4 !== 'boolean'))
        throw new error_1.EmptyModeError('reaction');
    if (arg_1 === 'bot' || arg_1 === 'all' || (0, types_1.isSnowflake)(arg_1))
        return ((param_1, param_2) => reaction(param_1, param_2, arg_1, true));
    if (arg_1 === undefined)
        return {
            type: 'reaction',
            data: {}
        };
    if (((0, types_1.isString)(arg_1) || (0, types_1.isEmoji)(arg_1)) && arg_4 === false) {
        if (arg_1.id === null)
            return {
                type: 'emoji+reaction',
                data: {
                    emoji: decodeURIComponent(arg_1.name),
                    query: (0, utils_1.isEmpty)(arg_2) ? '' : `?${Object.entries(arg_2).map(([key, value]) => {
                        return `${key}=${value}`;
                    }).join('&')}`
                }
            };
        if (arg_1.id)
            return {
                type: 'emoji+reaction',
                data: {
                    emoji: `${arg_1.name}:${arg_1.id}`,
                    query: (0, utils_1.isEmpty)(arg_2) ? '' : `?${Object.entries(arg_2).map(([key, value]) => {
                        return `${key}=${value}`;
                    }).join('&')}`
                }
            };
        return {
            type: 'emoji+reaction',
            data: {
                emoji: encodeURIComponent(arg_1),
                query: (0, utils_1.isEmpty)(arg_2) ? '' : `?${Object.entries(arg_2).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')}`
            }
        };
    }
    if (arg_3 === 'bot')
        return {
            type: 'client',
            data: {
                user_id: arg_3,
                data: reaction(arg_1, arg_2, '', false)
            }
        };
    if (arg_3 === 'all')
        return {
            type: 'all',
            data: {
                user_id: arg_3,
                data: reaction(arg_1, arg_2, '', false)
            }
        };
    return {
        type: 'id',
        data: {
            user_id: arg_3,
            data: reaction(arg_1, arg_2, '', false)
        }
    };
}
exports.default = reaction;
