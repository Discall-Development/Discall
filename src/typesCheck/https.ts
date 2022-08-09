import { HttpRequest, HttpRequestData, IdData } from "../types/https";

export function isHttpRequest(obj: any): obj is HttpRequest {
    return Object.keys(obj).filter(v => !["uri", "data", "cache", "reason"].includes(v)).length === 0 && "uri" in obj && typeof obj.uri === "function";
}

export function isHttpRequestData(obj: any): obj is HttpRequestData {
    return "type" in obj && "data" in obj;
}

export function isIdData(obj: any): obj is IdData {
    return isHttpRequestData(obj.data) && Object.keys(obj).filter(v => v.endsWith("id")).length === 1;
}