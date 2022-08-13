"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVoiceRegion = exports.isVoiceState = exports.isStageInstance = void 0;
function isStageInstance(obj) {
    let keys = ["id", "guild_id", "channel_id", "topic", "privacy_level", "discoverable_disabled", "guild_scheduled_event_id"];
    return !Object.keys(obj).filter(v => !keys.includes(v));
}
exports.isStageInstance = isStageInstance;
function isVoiceState(obj) {
    let keys = ["channel_id", "user_id", "session_id", "deaf", "mute", "self_deaf", "self_mute", "self_video", "suppress", "request_to_speak_timestamp"];
    return !Object.keys(obj).filter(v => !keys.includes(v));
}
exports.isVoiceState = isVoiceState;
function isVoiceRegion(obj) {
    let keys = ["id", "name", "optimal", "deprecated", "custom"];
    return !Object.keys(obj).filter(v => !keys.includes(v));
}
exports.isVoiceRegion = isVoiceRegion;
