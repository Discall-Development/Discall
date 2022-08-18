import { AuditLogEvent, HttpRequestData, SnowflakeData } from '@discall/types';
interface GetAuditLogFilters {
    user_id?: SnowflakeData;
    action_type?: AuditLogEvent;
    before?: SnowflakeData;
    limit?: number;
}
export default function auditLog(filters: GetAuditLogFilters): HttpRequestData;
export {};
