import { EmojiData, HttpRequestData, isEmoji, isLiteral, isSnowflake, isString, isTypeUndefined, SnowflakeData } from '@discall/types';
import { isEmpty } from '../../utils';

interface GetReactionsFilter {
    after?: SnowflakeData;
    limit?: number;
}

export default function reaction<T extends typeof reaction>(id: SnowflakeData): T;
export default function reaction(emoji: string): HttpRequestData;
export default function reaction(emoji: EmojiData): HttpRequestData;
export default function reaction(filter: GetReactionsFilter): HttpRequestData;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reaction(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function reaction<T extends typeof reaction>(arg_1: GetReactionsFilter | EmojiData | SnowflakeData | string, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                user_id: arg_2,
                data: reaction(arg_1 as never)
            }
        };

    if (arg_2 && arg_2 === 'bot')
        return {
            type: 'bot',
            data: {
                data: reaction(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => reaction(param_1, arg_1)) as T;

    if (isEmoji(arg_1) && isTypeUndefined(isLiteral(null))(arg_1.id) && arg_1.name)
        return {
            type: 'reaction',
            data: {
                emoji: decodeURIComponent(arg_1.name)
            }
        };

    if (isString(arg_1))
        return {
            type: 'reaction',
            data: {
                emoji: decodeURIComponent(arg_1)
            }
        };

    if (isEmoji(arg_1))
        return {
            type: 'reaction',
            data: {
                emoji: `${arg_1.name}:${arg_1.id}`
            }
        };
    if (isEmpty(arg_1))
        return {
            type: 'reaction',
            data: {
                query: ''
            }
        };

    return {
        type: 'reaction',
        data: {
            query: `?${
                Object.entries(arg_1).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')
            }`
        }
    };
}