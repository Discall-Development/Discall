import { HttpRequestData, isHttpRequestData, isSnowflake, SnowflakeData } from '@discall/types';

interface CreateGroupDmSettings {
    access_tokens: string[];
    nicks: Record<SnowflakeData, string>;
}

export default function group<T extends typeof group>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function group(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function group(data: HttpRequestData): HttpRequestData;
export default function group(settings: CreateGroupDmSettings): HttpRequestData;
export default function group<T extends typeof group>(arg_1: CreateGroupDmSettings | HttpRequestData | SnowflakeData, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                user_id: arg_2,
                data: group(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => group(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'group',
            data: arg_1
        };

    return {
        type: 'channel',
        data: { ...arg_1 }
    };
}