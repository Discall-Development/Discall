import { SnowflakeData, HttpRequestData, isSnowflake, ImageScheme } from '@discall/types';

interface CreateEmojiSettings {
    name: string;
    image: ImageScheme;
    roles: SnowflakeData[];
}

interface ModifyEmojiSettings {
    name?: string;
    roles?: SnowflakeData[] | null;
}

export default function emoji<T extends typeof emoji>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function emoji(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function emoji(settings: CreateEmojiSettings): HttpRequestData;
export default function emoji(settings: ModifyEmojiSettings): HttpRequestData;
export default function emoji<T extends typeof emoji = typeof emoji>(
    arg_1: CreateEmojiSettings | ModifyEmojiSettings | SnowflakeData,
    arg_2?: SnowflakeData
): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                emoji_id: arg_2,
                data: emoji(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => emoji(param_1, arg_1)) as T;

    return {
        type: 'emoji',
        data: { ...arg_1 }
    };
}