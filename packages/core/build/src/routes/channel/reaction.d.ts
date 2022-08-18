import { EmojiData, HttpRequestData, SnowflakeData } from '@discall/types';
interface GetReactionsFilter {
    after?: SnowflakeData;
    limit?: number;
}
export default function reaction<T extends typeof reaction>(id: SnowflakeData): T;
export default function reaction(emoji: string): HttpRequestData;
export default function reaction(emoji: EmojiData): HttpRequestData;
export default function reaction(filter: GetReactionsFilter): HttpRequestData;
export default function reaction(data_1: any, data_2: SnowflakeData): HttpRequestData;
export {};
