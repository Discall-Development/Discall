import { SnowflakeData, HttpRequestData, isSnowflake, isHttpRequestData, Timestamp } from '@discall/types';
import { isEmpty } from '../../utils';

interface GetMemberFilters {
    limit?: number;
    after?: SnowflakeData;
}

interface SearchMemberFilters {
    query: string;
    limit?: number;
}

interface AddMemberSettings {
    access_token: string;
    nick?: string;
    roles?: SnowflakeData[];
    mute?: boolean;
    deaf?: boolean;
}

interface ModifyMemberSettings {
    nick?: string | null;
    roles?: SnowflakeData[] | null;
    mute?: boolean | null;
    deaf?: boolean | null;
    channel_id?: boolean | null;
    communication_disabled_until?: Timestamp | null;
}

export default function member<T extends typeof member>(id: SnowflakeData): T;
export default function member<T extends typeof member>(mode: 'search' | 'add' | 'modify'): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function member(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function member(data: HttpRequestData): HttpRequestData;
export default function member(filters: GetMemberFilters | SearchMemberFilters): HttpRequestData;
export default function member(settings: AddMemberSettings): HttpRequestData;
export default function member(settings: ModifyMemberSettings): HttpRequestData;
export default function member<T extends typeof member>(arg_1: GetMemberFilters | SearchMemberFilters | AddMemberSettings | ModifyMemberSettings | HttpRequestData | SnowflakeData, arg_2?: SnowflakeData): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                thread_id: arg_2,
                data: member(arg_1 as never)
            }
        };
        
    if (arg_2 === 'search' || arg_2 === 'add' || arg_2 === 'modify')
        return {
            type: arg_2,
            data: member(arg_1 as never) as unknown as HttpRequestData
        };

    if (arg_1 === 'search' || isSnowflake(arg_1))
        return ((param_1: unknown) => member(param_1, arg_1 as never)) as T;
    
    if (isHttpRequestData(arg_1))
        return {
            type: 'member',
            data: arg_1
        };

    return {
        type: 'member',
        data: {
            data: arg_1,
            query: isEmpty(arg_1) ? '' : `?${
                Object.entries(arg_1).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')
            }`
        }
    };
}