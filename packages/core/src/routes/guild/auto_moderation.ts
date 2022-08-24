import { AutoModerationActionData, HttpRequestData, isHttpRequestData, isSnowflake, RuleEventTypes, RuleTriggerMetadata, RuleTriggerTypes, SnowflakeData } from '@discall/types';

interface CreateAutoModerationSettings {
    name: string;
    event_type: RuleEventTypes;
    trigger_type: RuleTriggerTypes;
    trigger_metadata?: RuleTriggerMetadata;
    actions: AutoModerationActionData[];
    enabled?: boolean;
    exempt_roles?: SnowflakeData[];
    exempt_channels?: SnowflakeData[];
}

interface ModifyAutoModerationSettings {
    name?: string;
    event_type?: RuleEventTypes;
    trigger_type?: RuleTriggerTypes;
    trigger_metadata?: RuleTriggerMetadata;
    actions?: AutoModerationActionData[];
    enabled?: boolean;
    exempt_roles?: SnowflakeData[];
    exempt_channels?: SnowflakeData[];
}

export default function autoModeration<T extends typeof autoModeration>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function autoModeration(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function autoModeration(data: HttpRequestData): HttpRequestData;
export default function autoModeration(settings: CreateAutoModerationSettings): HttpRequestData;
export default function autoModeration(settings: ModifyAutoModerationSettings): HttpRequestData;
export default function autoModeration<T extends typeof autoModeration>(
    arg_1: CreateAutoModerationSettings | ModifyAutoModerationSettings | SnowflakeData | HttpRequestData,
    arg_2?: SnowflakeData
): HttpRequestData | T {
    if (arg_2 && isSnowflake(arg_2))
        return {
            type: 'id',
            data: {
                moderation_id: arg_2,
                data: autoModeration(arg_1 as never)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown) => autoModeration(param_1, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'moderation',
            data: arg_1
        };

    return {
        type: 'moderation',
        data: { ...arg_1 }
    };
}