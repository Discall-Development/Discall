import { HttpRequest, HttpRequestData, IdData } from "../types/https";

export function isHttpRequest(obj: any): obj is HttpRequest {
    let keys: (keyof HttpRequest)[] = ["uri", "data", "cache", "reason"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isHttpRequestData(obj: any): obj is HttpRequestData {
    let keys: (keyof HttpRequestData)[] = ["type", "data"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isIdData(obj: any): obj is IdData {
    let keys: (keyof IdData)[] = ["channel_id", "message_id", "data"];
    return isHttpRequestData(obj.data) &&
        Object.keys(obj).filter(v => v.endsWith("id")).length === 1 &&
        !Object.keys(obj).filter((v: any) => !keys.includes(v));
}