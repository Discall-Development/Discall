import * as m from 'node-fetch';
import _FormData = require('form-data');
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace fetch {
    export const fetch = m.default;
    export const Blob = m.Blob;
    export const Headers = m.Headers;
    export const Response = m.Response;
    export const FormData = _FormData;
    export type Blob = typeof m.Blob;
    export type Headers = typeof m.Headers;
    export type Response = typeof m.Response;
    export type FormData = typeof _FormData.prototype;
}