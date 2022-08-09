import { DiscordData } from "../types/ws";

export function isDiscordData(obj: any): obj is DiscordData {
    return typeof obj.op === "number";
}