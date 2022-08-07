import { EmptyError } from "./error";
import { HttpRequestData, isHttpRequestData, SnowflakeData } from "./types";
import { isEmpty } from "./utils";

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
export default function channel(param: HttpRequestData): HttpRequestData;
export default function channel(channel: {

}, options?: {}): HttpRequestData;
export default function channel(first: any, second?: any) {
    if (isEmpty(first))
        throw new EmptyError("channel");

    if (typeof first === "string")
        return function(f?: any, s?: any): HttpRequestData {
            if (isHttpRequestData(f))
                return {
                    type: "id",
                    data: {
                        id: first,
                        data: f
                    }
                };

            return {
                type: "channel+id",
                data: {
                    id: first,
                    data: channel(f, s)
                }
            };
        };

    if (typeof first.type === "string" && first.data)
        return {
            type: "channel",
            data: first
        }

    return {
        type: "channel",
        data: { ...first, ...second }
    };
}