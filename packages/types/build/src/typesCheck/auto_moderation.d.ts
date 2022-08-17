import { AutoModerationActionData, AutoModerationActionMetadata, AutoModerationRuleData, RuleTriggerMetadata } from '../auto_moderation';
export declare function isAutoModerationRule(obj: unknown): obj is AutoModerationRuleData;
export declare function isRuleTriggerMetadata(obj: unknown): obj is RuleTriggerMetadata;
export declare function isAutoModerationAction(obj: unknown): obj is AutoModerationActionData;
export declare function isAutoModerationActionMetadata(obj: unknown): obj is AutoModerationActionMetadata;
