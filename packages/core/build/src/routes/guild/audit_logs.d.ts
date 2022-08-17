import { AuditLogEvent, HttpRequestData, SnowflakeData } from '@discall/types';
export default function auditLogs(filters: {
    user_id?: SnowflakeData;
    action_type?: AuditLogEvent;
    before?: SnowflakeData;
    limit?: number;
}): HttpRequestData;
