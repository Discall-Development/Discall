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
    data: HttpRequest | T;
}