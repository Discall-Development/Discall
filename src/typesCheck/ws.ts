import { DiscordData } from "../types/ws";

export function isDiscordData(obj: any): obj is DiscordData {
    let keys: (keyof DiscordData)[] = ["op", "d", "s", "t"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}