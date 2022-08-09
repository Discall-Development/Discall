import { SnowflakeData } from "./snowflake";

export enum HttpMode {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}

export interface HttpRequest {
    uri: (base: URL) => { uri: string, mode: HttpMode };
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

export enum HttpUri {
    "create+id+message" = "/channels/{id}/messages"
}

export enum UriMode {
    "create+id+message" = HttpMode.POST
}