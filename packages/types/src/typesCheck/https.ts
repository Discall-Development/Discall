import { HttpRequest, HttpRequestData, IdData } from '../https';
import { isAny, isFunction, isString, isTypeObject, isTypeUndefined, isUnion } from './original';
import { isSnowflake } from './snowflake';

export function isHttpRequest(obj: unknown): obj is HttpRequest {
    return isTypeObject({
        uri: isFunction,
        data: isTypeUndefined(isAny),
        cache: isTypeUndefined(isFunction),
        reason: isTypeUndefined(isString)
    })(obj);
}

export function isHttpRequestData(obj: unknown): obj is HttpRequestData {
    return isTypeObject({
        type: isString,
        data: isUnion(isHttpRequestData, isIdData, isAny)
    })(obj);
}

export function isIdData(obj: unknown): obj is IdData {
    return isTypeObject({
        guild_id: isTypeUndefined(isSnowflake),
        channel_id: isTypeUndefined(isSnowflake),
        message_id: isTypeUndefined(isSnowflake),
        data: isHttpRequestData
    })(obj);
}