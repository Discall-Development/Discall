import { Timestamp } from "../timestamp";

export function isTimestamp(obj: any): obj is Timestamp {
    return typeof obj === "string" && new Date(0) < new Date(obj);
}