import { SnowflakeData } from "./snowflake";
export declare enum HttpMode {
    GET = 0,
    POST = 1,
    PUT = 2,
    PATCH = 3,
    DELETE = 4
}
export interface HttpRequest {
    uri: (base: URL) => {
        uri: string;
        mode: HttpMode;
    };
    data?: any;
    cache?: (() => any) | ((data: any) => void);
    reason?: string;
}
export interface HttpRequestData<T extends {} = {}> {
    type: string;
    data: HttpRequestData | IdData | T;
}
export interface IdData {
    guild_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    message_id?: SnowflakeData;
    data: HttpRequestData;
}
export declare enum HttpUri {
    "create+id+message" = "/channels/{channel_id}/messages"
}
export declare enum UriMode {
    "create+id+message" = 1
}
