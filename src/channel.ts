import { EmptyError } from "./error";
import { HttpRequestData, SnowflakeData } from "./types";
import { isEmpty } from "./utils";

export default function channel<T extends typeof channel>(id: SnowflakeData): T;
export default function channel(param: HttpRequestData): HttpRequestData;
export default function channel(channel: {

}, options?: {}): HttpRequestData;
export default function channel(first: any, second?: any) {
    if (!isEmpty(first))
        throw new EmptyError("channel");

    if (typeof first === "string")
        return function(first?: any, second?: any): HttpRequestData {
            if (!first)
                return {
                    type: "id",
                    data: {}
                }

            return {
                type: "channel+id",
                data: {
                    id: first,
                    message: channel(first, second)
                }
            };
        };

    if (typeof first.type === "string" && first.data)
        return {
            type: `channel+${first.type}`,
            data: first
        }

    return {
        type: "channel",
        data: { ...first, ...second }
    };
}