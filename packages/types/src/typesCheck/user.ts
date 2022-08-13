import { ActivityAssets, ActivityButtons, ActivityData, ActivityEmoji, ActivityParty, ActivitySecrets, ActivityTimestamps, ClientStatusData, PresenceUpdateData, UserData } from "../user";
import { isLocaleOption } from "./channel";
import { isBoolean, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeTuple, isTypeUndefined } from "./original";
import { isSnowflake } from "./snowflake";

export function isActivity(obj: any): obj is ActivityData {
    return isTypeObject({
        name: isString,
        type: isNumber,
        url: isTypeUndefined(isTypeNull(isString)),
        created_at: isNumber,
        timestamps: isTypeUndefined(isActivityTimestamp),
        application_id: isTypeUndefined(isSnowflake),
        details: isTypeUndefined(isTypeNull(isString)),
        state: isTypeUndefined(isTypeNull(isString)),
        emoji: isTypeUndefined(isTypeNull(isActivityEmoji)),
        party: isTypeUndefined(isActivityParty),
        assets: isTypeUndefined(isActivityAssets),
        secrets: isTypeUndefined(isActivitySecrets),
        instance: isTypeUndefined(isBoolean),
        flags: isNumber,
        buttons: isTypeUndefined(isActivityButtons),
    })(obj);
}

export function isActivityTimestamp(obj: any): obj is ActivityTimestamps {
    return isTypeObject({
        start: isTypeUndefined(isNumber),
        end: isTypeUndefined(isNumber)
    })(obj);
}

export function isActivityEmoji(obj: any): obj is ActivityEmoji {
    return isTypeObject({
        name: isString,
        id: isTypeUndefined(isSnowflake),
        animated: isTypeUndefined(isBoolean)
    })(obj);
}

export function isActivityParty(obj: any): obj is ActivityParty {
    return isTypeObject({
        id: isTypeUndefined(isString),
        size: isTypeUndefined(isTypeTuple(isNumber, isNumber))
    })(obj);
}

export function isActivityAssets(obj: any): obj is ActivityAssets {
    return isTypeObject({
        large_image: isTypeUndefined(isString),
        large_text: isTypeUndefined(isString),
        small_image: isTypeUndefined(isString),
        small_text: isTypeUndefined(isString)
    })(obj);
}

export function isActivitySecrets(obj: any): obj is ActivitySecrets {
    return isTypeObject({
        join: isTypeUndefined(isString),
        spectate: isTypeUndefined(isString),
        match: isTypeUndefined(isString)
    })(obj);
}

export function isActivityButtons(obj: any): obj is ActivityButtons {
    return isTypeObject({
        label: isString,
        url: isString
    })(obj);
}

export function isClientStatus(obj: any): obj is ClientStatusData {
    return isTypeObject({
        desktop: isTypeUndefined(isString),
        mobile: isTypeUndefined(isString),
        web: isTypeUndefined(isString)
    })(obj);
}

export function isUser(obj: any): obj is UserData {
    return isTypeObject({
        id: isSnowflake,
        username: isString,
        discriminator: isString,
        avatar: isTypeNull(isString),
        bot: isTypeUndefined(isBoolean),
        system: isTypeUndefined(isBoolean),
        mfa_enabled: isTypeUndefined(isBoolean),
        banner: isTypeUndefined(isTypeNull(isString)),
        accent_color: isTypeUndefined(isTypeNull(isNumber)),
        locale: isTypeUndefined(isLocaleOption),
        verified: isTypeUndefined(isBoolean),
        email: isTypeUndefined(isTypeNull(isString)),
        flags: isTypeUndefined(isNumber),
        premium_type: isTypeUndefined(isNumber),
        public_flags: isTypeUndefined(isNumber),
    })(obj);
}

export function isPresenceUpdate(obj: any): obj is PresenceUpdateData {
    return isTypeObject({
        user: isUser,
        guild_id: isSnowflake,
        status: isString,
        activities: isTypeArray(isActivity),
        client_status: isClientStatus
    })(obj);
}
