import { HttpRequestData, InviteTargetType, SnowflakeData } from '@discall/types';
interface CreateInviteSettings {
    max_age?: number;
    max_uses?: number;
    temporary?: boolean;
    unique?: boolean;
    target_type?: InviteTargetType;
    target_user_id?: SnowflakeData;
    target_application_id?: SnowflakeData;
}
export default function invite<T extends typeof invite>(code: string): T;
export default function invite(data_1: any, data_2: string): HttpRequestData;
export default function invite(data: HttpRequestData): HttpRequestData;
export default function invite(settings: CreateInviteSettings): HttpRequestData;
export {};
