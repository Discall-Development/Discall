import { StageInstanceData, VoiceRegionData, VoiceStateData } from "../voice";
import { isGuildMember } from "./guild";
import { isBoolean, isNumber, isString, isTypeNull, isTypeObject, isTypeUndefined } from "./original";
import { isSnowflake } from "./snowflake";
import { isTimestamp } from "./timestamp";

export function isStageInstance(obj: any): obj is StageInstanceData {
    return isTypeObject({
        id: isSnowflake,
        guild_id: isSnowflake,
        channel_id: isSnowflake,
        topic: isString,
        privacy_level: isNumber,
        discoverable_disabled: isBoolean,
        guild_scheduled_event_id: isTypeNull(isSnowflake)
    })(obj);
}

export function isVoiceState(obj: any): obj is VoiceStateData {
    return isTypeObject({
        guild_id: isTypeUndefined(isSnowflake),
        channel_id: isTypeNull(isSnowflake),
        user_id: isSnowflake,
        member: isTypeUndefined(isGuildMember),
        session_id: isString,
        deaf: isBoolean,
        mute: isBoolean,
        self_deaf: isBoolean,
        self_mute: isBoolean,
        self_stream: isTypeUndefined(isBoolean),
        self_video: isBoolean,
        suppress: isBoolean,
        request_to_speak_timestamp: isTypeNull(isTimestamp),
    })(obj);
}

export function isVoiceRegion(obj: any): obj is VoiceRegionData {
    return isTypeObject({
        id: isString,
        name: isString,
        optimal: isBoolean,
        deprecated: isBoolean,
        custom: isBoolean
    })(obj);
}