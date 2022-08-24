import { EmojiData, HttpRequestData, isEmoji, isSnowflake, isString, SnowflakeData } from '@discall/types';
import { EmptyModeError } from '../../error';
import { isEmpty } from '../../utils';

interface GetReactionsFilter {
    after?: SnowflakeData;
    limit?: number;
}

export default function reaction(): HttpRequestData;
export default function reaction<T extends typeof reaction>(id: SnowflakeData): T;
export default function reaction<T extends typeof reaction>(mode: 'bot' | 'all'): T;
export default function reaction(emoji: string | EmojiData, filter?: GetReactionsFilter): HttpRequestData;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reaction(data_1: any, data_2: any, data_3: SnowflakeData | 'bot' | 'all', data_4: boolean): HttpRequestData;
export default function reaction<T extends typeof reaction>(arg_1?: 'bot' | 'all' | string | EmojiData | SnowflakeData, arg_2?: GetReactionsFilter, arg_3?: SnowflakeData | 'bot' | 'all', arg_4?: true | false): HttpRequestData | T {
    if (arg_1 !== 'bot' && arg_1 as never !== 'all' && !isSnowflake(arg_1) && (!arg_3 && typeof arg_4 !== 'boolean'))
        throw new EmptyModeError('reaction');

    if (arg_1 === 'bot' || arg_1 === 'all' || isSnowflake(arg_1))
        return ((param_1: unknown, param_2: unknown) => reaction(param_1, param_2, arg_1, true)) as T;

    if (arg_1 === undefined)
        return {
            type: 'reaction',
            data: {}
        };

    if ((isString(arg_1) || isEmoji(arg_1)) && arg_4 === false) {
        if (arg_1.id === null)
            return {
                type: 'emoji+reaction',
                data: {
                    emoji: decodeURIComponent(arg_1.name as string),
                    query: isEmpty(arg_2) ? '' : `?${
                        Object.entries(arg_2 as object).map(([key, value]) => {
                            return `${key}=${value}`;
                        }).join('&')
                    }`
                }
            };

        if (arg_1.id)
            return {
                type: 'emoji+reaction',
                data: {
                    emoji: `${arg_1.name}:${arg_1.id}`,
                    query: isEmpty(arg_2) ? '' : `?${
                        Object.entries(arg_2 as object).map(([key, value]) => {
                            return `${key}=${value}`;
                        }).join('&')
                    }`
                }
            };

        return {
            type: 'emoji+reaction',
            data: {
                emoji: encodeURIComponent(arg_1 as unknown as string),
                query: isEmpty(arg_2) ? '' : `?${
                    Object.entries(arg_2 as object).map(([key, value]) => {
                        return `${key}=${value}`;
                    }).join('&')
                }`
            }
        };
    }

    if (arg_3 === 'bot')
        return {
            type: 'client',
            data: {
                user_id: arg_3,
                data: reaction(arg_1 as never, arg_2, '', false)
            }
        };

    if (arg_3 === 'all')
        return {
            type: 'all',
            data: {
                user_id: arg_3,
                data: reaction(arg_1 as never, arg_2, '', false)
            }
        };

    return {
        type: 'id',
        data: {
            user_id: arg_3,
            data: reaction(arg_1 as never, arg_2, '', false)
        }
    };
}