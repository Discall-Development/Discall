import { AuditLogEvent, HttpRequestData, SnowflakeData } from '@discall/types';
import { isEmpty } from '../../utils';

interface GetAuditLogFilters {
    user_id?: SnowflakeData;
    action_type?: AuditLogEvent,
    before?: SnowflakeData;
    limit?: number;
}

export default function auditLog(filters: GetAuditLogFilters): HttpRequestData {
    if (isEmpty(filters))
        return {
            type: 'audit',
            data: {
                query: ''
            }
        };

    return {
        type: 'audit',
        data: {
            query: `?${
                Object.entries(filters).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')
            }`
        }
    };
}