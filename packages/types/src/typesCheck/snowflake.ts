import { SnowflakeData } from '../snowflake';

export function isSnowflake(obj: unknown): obj is SnowflakeData {
    return typeof obj === 'string' && !Number.isNaN(Number(obj));
}