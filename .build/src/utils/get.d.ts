import { SnowflakeData } from "../typo";
import caches from "./cache";
declare type CT = typeof caches;
declare type ValueOfRecord<T, K extends keyof T> = {
    [K in keyof T]-?: K extends string ? T[K] extends Map<SnowflakeData, infer V> ? V : never : never;
}[K];
export default function get<N extends keyof CT, K extends SnowflakeData, V extends ValueOfRecord<CT, N>>(type: N, id: K): V;
export default function get<N extends keyof CT, V extends ValueOfRecord<CT, N>>(type: N, check: ((data: V) => boolean)): V;
export {};
