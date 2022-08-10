import { SnowflakeData } from "../types/snowflake";

export function isSnowflake(obj: any): obj is SnowflakeData {
    return typeof obj === "string" && !Number.isNaN(Number(obj));
}