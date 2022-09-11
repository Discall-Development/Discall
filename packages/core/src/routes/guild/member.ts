import { SnowflakeData, HttpRequestData, isSnowflake, isHttpRequestData, Timestamp, isTypeObject, isString, isTypeUndefined, isTypeArray, isBoolean, isTypeNull, isTimestamp, isNumber } from '@discall/types';
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

function isGetMemberFilters(obj: unknown): obj is GetMemberFilters {
    return isTypeObject({
        limit: isTypeUndefined(isNumber),
        after: isTypeUndefined(isSnowflake)
    })(obj);
}

function isSearchMemberFilters(obj: unknown): obj is SearchMemberFilters {
    return isTypeObject({
        query: isString,
        limit: isTypeUndefined(isNumber)
    })(obj);
}

function isAddMemberSettings(obj: unknown): obj is AddMemberSettings {
    return isTypeObject({
        access_token: isString,
        nick: isTypeUndefined(isString),
        roles: isTypeUndefined(isTypeArray(isSnowflake)),
        mute: isTypeUndefined(isBoolean),
        deaf: isTypeUndefined(isBoolean)
    })(obj);
}

function isModifyMemberSettings(obj: unknown): obj is ModifyMemberSettings {
    return isTypeObject({
        nick: isTypeUndefined(isTypeNull(isString)),
        roles: isTypeUndefined(isTypeNull(isTypeArray(isSnowflake))),
        mute: isTypeUndefined(isTypeNull(isBoolean)),
        deaf: isTypeUndefined(isTypeNull(isBoolean)),
        channel_id: isTypeUndefined(isTypeNull(isBoolean)),
        communication_disabled_until: isTypeUndefined(isTypeNull(isTimestamp))
    })(obj) && !isGetMemberFilters(obj) && !isSearchMemberFilters(obj);
}

export default function member<T extends typeof member>(id: SnowflakeData): T;
export default function member<T extends typeof member>(mode: 'search'): T;
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
        
    if (arg_2 === 'search')
        return {
            type: 'search',
            data: {
                thread_id: arg_2,
                data: member(arg_1 as never)
            }
        };

    if (arg_1 === 'search' || isSnowflake(arg_1))
        return ((param_1: unknown) => member(param_1, arg_1 as never)) as T;

    if (isAddMemberSettings(arg_1))
        return {
            type: 'add+member',
            data: { ...arg_1 }
        };
        
    if (isModifyMemberSettings(arg_1))
        return {
            type: 'modify+member',
            data: { ...arg_1 }
        };
    
    if (isHttpRequestData(arg_1) && !isEmpty(arg_1))
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