import { SnowflakeData, HttpRequestData, isSnowflake, isHttpRequestData } from '@discall/types';
import { isEmpty } from '../../utils';

interface GetMemberFilters {
    limit?: number;
    after?: SnowflakeData;
}

export default function member<T extends typeof member>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function member(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function member(data: HttpRequestData): HttpRequestData;
export default function member(filters: GetMemberFilters): HttpRequestData;
export default function member<T extends typeof member>(arg_1: GetMemberFilters | HttpRequestData | SnowflakeData, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                thread_id: arg_2,
                data: member(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => member(param_1, arg_1)) as T;

    
    if (isHttpRequestData(arg_1))
        return {
            type: 'member',
            data: arg_1
        };

    return {
        type: 'member',
        data: {
            query: isEmpty(arg_1) ? '' : `?${
                Object.entries(arg_1).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')
            }`
        }
    };
}