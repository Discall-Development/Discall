import { SnowflakeData, HttpRequestData } from '@discall/types';
interface GetMemberFilters {
    limit?: number;
    after?: SnowflakeData;
}
export default function member<T extends typeof member>(id: SnowflakeData): T;
export default function member(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function member(data: HttpRequestData): HttpRequestData;
export default function member(filters: GetMemberFilters): HttpRequestData;
export {};
