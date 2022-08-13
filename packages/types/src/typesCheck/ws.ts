import { DiscordData } from "../ws";
import { isAny, isNumber, isString, isTypeObject, isTypeUndefined } from "./original";

export function isDiscordData(obj: any): obj is DiscordData {
    return isTypeObject({
        op: isNumber,
        d: isTypeUndefined(isAny),
        s: isTypeUndefined(isNumber),
        t: isTypeUndefined(isString)
    })(obj);
}