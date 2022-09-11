import { SnowflakeData, HttpRequestData, ImageScheme } from '@discall/types';
interface CreateEmojiSettings {
    name: string;
    image: ImageScheme;
    roles: SnowflakeData[];
}
interface ModifyEmojiSettings {
    name?: string;
    roles?: SnowflakeData[] | null;
}
export default function emoji<T extends typeof emoji>(id: SnowflakeData): T;
export default function emoji(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function emoji(settings: CreateEmojiSettings): HttpRequestData;
export default function emoji(settings: ModifyEmojiSettings): HttpRequestData;
export {};
