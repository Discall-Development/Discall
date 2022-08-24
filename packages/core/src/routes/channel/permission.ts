import { HttpRequestData, isHttpRequestData, isSnowflake, OverwriteType, SnowflakeData } from '@discall/types';

interface EditPermissionSettings {
    allow?: string;
    deny?: string;
    type: OverwriteType
}

export default function permission<T extends typeof permission>(id: SnowflakeData): T;
export default function permission(overwrite: EditPermissionSettings): HttpRequestData;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function permission(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function permission<T extends typeof permission>(arg_1: EditPermissionSettings | SnowflakeData, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                overwrite_id: arg_2,
                data: permission(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => permission(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'permission',
            data: arg_1
        };

    return {
        type: 'permission',
        data: { ...arg_1 }
    };
}