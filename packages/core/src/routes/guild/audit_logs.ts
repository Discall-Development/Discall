import { AuditLogEvent, HttpRequestData, SnowflakeData } from '@discall/types';
import { isEmpty } from '../../utils';

export default function auditLogs(filters: {
    user_id?: SnowflakeData;
    action_type?: AuditLogEvent,
    before?: SnowflakeData;
    limit?: number;
}): HttpRequestData {
    if (isEmpty(filters))
        return {
            type: 'audit',
            data: {
                query: '',
                data: {}
            }
        };

    return {
        type: 'audit',
        data: {
            query: `?${
                Object.entries(filters).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join('&')
            }`,
            data: {}
        }
    };
}