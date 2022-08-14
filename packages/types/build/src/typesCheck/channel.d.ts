import { ChannelData, ChannelMentionData, LocaleOption, OverwriteData, ThreadMemberData, ThreadMetadataData, WebhookData, WelcomeScreenChannelData } from '../channel';
export declare function isChannel(obj: unknown): obj is ChannelData;
export declare function isWelcomeScreenChannel(obj: unknown): obj is WelcomeScreenChannelData;
export declare function isChannelMention(obj: unknown): obj is ChannelMentionData;
export declare function isThreadMetadata(obj: unknown): obj is ThreadMetadataData;
export declare function isThreadMember(obj: unknown): obj is ThreadMemberData;
export declare function isOverwrite(obj: unknown): obj is OverwriteData;
export declare function isLocaleOption(obj: unknown): obj is LocaleOption;
export declare function isWebhook(obj: unknown): obj is WebhookData;
