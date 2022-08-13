import { ActivityAssets, ActivityButtons, ActivityData, ActivityEmoji, ActivityParty, ActivitySecrets, ActivityTimestamps, ClientStatusData, PresenceUpdateData, UserData } from "../user";
export declare function isActivity(obj: any): obj is ActivityData;
export declare function isActivityTimestamp(obj: any): obj is ActivityTimestamps;
export declare function isActivityEmoji(obj: any): obj is ActivityEmoji;
export declare function isActivityParty(obj: any): obj is ActivityParty;
export declare function isActivityAssets(obj: any): obj is ActivityAssets;
export declare function isActivitySecrets(obj: any): obj is ActivitySecrets;
export declare function isActivityButtons(obj: any): obj is ActivityButtons;
export declare function isClientStatus(obj: any): obj is ClientStatusData;
export declare function isUser(obj: any): obj is UserData;
export declare function isPresenceUpdate(obj: any): obj is PresenceUpdateData;