import { SnowflakeData, HttpRequestData, Timestamp } from '@discall/types';
interface GetMemberFilters {
    limit?: number;
    after?: SnowflakeData;
}
interface SearchMemberFilters {
    query: string;
    limit?: number;
}
interface AddMemberSettings {
    access_token: string;
    nick?: string;
    roles?: SnowflakeData[];
    mute?: boolean;
    deaf?: boolean;
}
interface ModifyMemberSettings {
    nick?: string | null;
    roles?: SnowflakeData[] | null;
    mute?: boolean | null;
    deaf?: boolean | null;
    channel_id?: boolean | null;
    communication_disabled_until?: Timestamp | null;
}
export default function member<T extends typeof member>(id: SnowflakeData): T;
export default function member<T extends typeof member>(mode: 'search' | 'add' | 'modify'): T;
export default function member(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function member(data: HttpRequestData): HttpRequestData;
export default function member(filters: GetMemberFilters | SearchMemberFilters): HttpRequestData;
export default function member(settings: AddMemberSettings): HttpRequestData;
export default function member(settings: ModifyMemberSettings): HttpRequestData;
export {};
