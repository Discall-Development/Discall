import { SnowflakeData } from './snowflake';

export enum HttpMode {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}

export interface HttpRequest {
    uri: (base: URL) => { uri: string, mode: HttpMode };
    data?: unknown;
    cache?: (() => unknown) | ((data: unknown) => void);
    reason?: string;
}

export interface HttpRequestData {
    type: string;
    data: HttpRequestData | IdData | Record<string, unknown> | Record<string, never>;
}

export interface IdData {
    guild_id?: SnowflakeData;
    channel_id?: SnowflakeData;
    message_id?: SnowflakeData;
    data: HttpRequestData;
}

export enum HttpUri {
    'create+id+message' = '/channels/{channel_id}/messages'
}

export enum UriMode {
    'create+id+message' = HttpMode.POST
}