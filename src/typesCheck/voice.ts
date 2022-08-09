import { StageInstanceData, VoiceRegionData, VoiceStateData } from "../types/voice";

export function isStageInstance(obj: any): obj is StageInstanceData {
    return "id" in obj &&
        "guild_id" in obj &&
        "channel_id" in obj &&
        "topic" in obj &&
        "privacy_level" in obj &&
        "discoverable_disabled" in obj &&
        "guild_scheduled_event_id" in obj;
}

export function isVoiceState(obj: any): obj is VoiceStateData {
    return "channel_id" in obj &&
        "user_id" in obj &&
        "session_id" in obj &&
        "deaf" in obj &&
        "mute" in obj &&
        "self_deaf" in obj &&
        "self_mute" in obj &&
        "self_video" in obj &&
        "suppress" in obj &&
        "request_to_speak_timestamp" in obj;
}

export function isVoiceRegion(obj: any): obj is VoiceRegionData {
    return "id" in obj &&
        "name" in obj &&
        "optimal" in obj &&
        "deprecated" in obj &&
        "custom" in obj;
}