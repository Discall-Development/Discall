import { HttpRequestData, OverwriteType, SnowflakeData } from '@discall/types';
interface EditPermissionSettings {
    allow?: string;
    deny?: string;
    type: OverwriteType;
}
export default function permission<T extends typeof permission>(id: SnowflakeData): T;
export default function permission(overwrite: EditPermissionSettings): HttpRequestData;
export default function permission(data_1: any, data_2: SnowflakeData): HttpRequestData;
export {};
