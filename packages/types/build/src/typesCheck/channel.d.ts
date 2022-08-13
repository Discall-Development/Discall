import { ChannelData, ChannelMentionData, OverwriteData, ThreadMemberData, ThreadMetadataData, WebhookData, WelcomeScreenChannelData } from "../channel";
export declare function isChannel(obj: any): obj is ChannelData;
export declare function isWelcomeScreenChannel(obj: any): obj is WelcomeScreenChannelData;
export declare function isChannelMention(obj: any): obj is ChannelMentionData;
export declare function isThreadMetadata(obj: any): obj is ThreadMetadataData;
export declare function isThreadMember(obj: any): obj is ThreadMemberData;
export declare function isOverwrite(obj: any): obj is OverwriteData;
export declare function isWebhook(obj: any): obj is WebhookData;
