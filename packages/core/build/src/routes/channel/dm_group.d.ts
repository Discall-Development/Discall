import { HttpRequestData, SnowflakeData } from '@discall/types';
interface CreateGroupDmSettings {
    access_tokens: string[];
    nicks: Record<SnowflakeData, string>;
}
export default function group<T extends typeof group>(id: SnowflakeData): T;
export default function group(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function group(data: HttpRequestData): HttpRequestData;
export default function group(settings: CreateGroupDmSettings): HttpRequestData;
export {};
