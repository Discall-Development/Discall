import { StageInstanceData, VoiceRegionData, VoiceStateData } from "../types/voice";


export function isStageInstance(obj: any): obj is StageInstanceData {
    let keys: (keyof StageInstanceData)[] = ["id", "guild_id", "channel_id", "topic", "privacy_level", "discoverable_disabled", "guild_scheduled_event_id"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isVoiceState(obj: any): obj is VoiceStateData {
    let keys: (keyof VoiceStateData)[] = ["channel_id", "user_id", "session_id", "deaf", "mute", "self_deaf", "self_mute", "self_video", "suppress", "request_to_speak_timestamp"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}

export function isVoiceRegion(obj: any): obj is VoiceRegionData {
    let keys: (keyof VoiceRegionData)[] = ["id", "name", "optimal", "deprecated", "custom"];
    return !Object.keys(obj).filter((v: any) => !keys.includes(v));
}