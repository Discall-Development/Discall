import { HttpRequestData, InviteTargetType, isHttpRequestData, isString, SnowflakeData } from '@discall/types';

interface CreateInviteSettings {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
    target_type?: InviteTargetType;
    target_user_id?: SnowflakeData;
    target_application_id?: SnowflakeData;
}

export default function invite<T extends typeof invite>(code: string): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function invite(data_1: any, data_2: string): HttpRequestData;
export default function invite(data: HttpRequestData): HttpRequestData;
export default function invite(settings: CreateInviteSettings): HttpRequestData;
export default function invite<T extends typeof invite>(arg_1?: string | HttpRequestData | CreateInviteSettings, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isString(arg_2))
        return {
            type: 'code',
            data: {
                code: arg_2,
                data: invite(arg_1 as never)
            }
        };

    if (isString(arg_1))
        return ((param_1: unknown) => invite(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'invite',
            data: arg_1
        };

    return {
        type: 'invite',
        data: { ...arg_1 }
    };
}