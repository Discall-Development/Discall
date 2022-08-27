import { AutoModerationActionData, HttpRequestData, RuleEventTypes, RuleTriggerMetadata, RuleTriggerTypes, SnowflakeData } from '@discall/types';
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
export default function autoModeration(data_1: any, data_2: SnowflakeData): HttpRequestData;
export default function autoModeration(data: HttpRequestData): HttpRequestData;
export default function autoModeration(settings: CreateAutoModerationSettings): HttpRequestData;
export default function autoModeration(settings: ModifyAutoModerationSettings): HttpRequestData;
export {};
