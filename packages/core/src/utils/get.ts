import { SnowflakeData } from '@discall/types';
import caches from './cache';

type CT = typeof caches;
type ValueOfRecord<T, K extends keyof T> = {
    [K in keyof T]-?: K extends string ?
        T[K] extends Map<SnowflakeData, infer V> ?
            V : never
        : never
}[K];

export default function getCache<N extends keyof CT, K extends SnowflakeData, V extends ValueOfRecord<CT, N>>(type: N, id: K): V;
export default function getCache<N extends keyof CT, V extends ValueOfRecord<CT, N>>(type: N, check: ((data: V) => boolean)): V;
export default function getCache<N extends keyof CT, K extends SnowflakeData, V extends ValueOfRecord<CT, N>>(type: N, param: K | ((data: V) => boolean)) {
    if (typeof param === 'function')
        return [...(caches[type].values())].filter(v => param(v as unknown as V));

    if (caches[type].has(param))
        return caches[type].get(param);
}