import * as m from "node-fetch";
import _FormData = require("form-data");
export declare module fetch {
    const fetch: typeof import("node-fetch").default;
    const Blob: typeof m.Blob;
    const Headers: typeof m.Headers;
    const Response: typeof m.Response;
    const FormData: typeof _FormData;
    type Blob = typeof m.Blob;
    type Headers = typeof m.Headers;
    type Response = typeof m.Response;
    type FormData = typeof _FormData.prototype;
}
