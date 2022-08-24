import { EmojiData, HttpRequestData, SnowflakeData } from '@discall/types';
interface GetReactionsFilter {
    after?: SnowflakeData;
    limit?: number;
}
export default function reaction(): HttpRequestData;
export default function reaction<T extends typeof reaction>(id: SnowflakeData): T;
export default function reaction<T extends typeof reaction>(mode: 'bot' | 'all'): T;
export default function reaction(emoji: string | EmojiData, filter?: GetReactionsFilter): HttpRequestData;
export default function reaction(data_1: any, data_2: any, data_3: SnowflakeData | 'bot' | 'all', data_4: boolean): HttpRequestData;
export {};
