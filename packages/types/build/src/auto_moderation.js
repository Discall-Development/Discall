"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoModerationActionTypes = exports.KeywordPresetTypes = exports.RuleTriggerTypes = exports.RuleEventTypes = void 0;
var RuleEventTypes;
(function (RuleEventTypes) {
    RuleEventTypes[RuleEventTypes["MESSAGE_SEND"] = 1] = "MESSAGE_SEND";
})(RuleEventTypes = exports.RuleEventTypes || (exports.RuleEventTypes = {}));
var RuleTriggerTypes;
(function (RuleTriggerTypes) {
    RuleTriggerTypes[RuleTriggerTypes["KEYWORD"] = 1] = "KEYWORD";
    RuleTriggerTypes[RuleTriggerTypes["HARMFUL_LINK"] = 2] = "HARMFUL_LINK";
    RuleTriggerTypes[RuleTriggerTypes["SPAM"] = 3] = "SPAM";
    RuleTriggerTypes[RuleTriggerTypes["KEYWORD_PRESET"] = 4] = "KEYWORD_PRESET";
    RuleTriggerTypes[RuleTriggerTypes["MENTION_SPAM"] = 5] = "MENTION_SPAM";
})(RuleTriggerTypes = exports.RuleTriggerTypes || (exports.RuleTriggerTypes = {}));
var KeywordPresetTypes;
(function (KeywordPresetTypes) {
    KeywordPresetTypes[KeywordPresetTypes["PROFANITY"] = 1] = "PROFANITY";
    KeywordPresetTypes[KeywordPresetTypes["SEXUAL_CONTENT"] = 2] = "SEXUAL_CONTENT";
    KeywordPresetTypes[KeywordPresetTypes["SLURS"] = 3] = "SLURS";
})(KeywordPresetTypes = exports.KeywordPresetTypes || (exports.KeywordPresetTypes = {}));
var AutoModerationActionTypes;
(function (AutoModerationActionTypes) {
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MESSAGE"] = 1] = "BLOCK_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["SEND_ALERT_MESSAGE"] = 2] = "SEND_ALERT_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["TIMEOUT"] = 3] = "TIMEOUT";
})(AutoModerationActionTypes = exports.AutoModerationActionTypes || (exports.AutoModerationActionTypes = {}));
