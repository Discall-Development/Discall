"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriMode = exports.HttpUri = exports.HttpMode = void 0;
var HttpMode;
(function (HttpMode) {
    HttpMode[HttpMode["GET"] = 0] = "GET";
    HttpMode[HttpMode["DELETE"] = 1] = "DELETE";
    HttpMode[HttpMode["POST"] = 2] = "POST";
    HttpMode[HttpMode["PUT"] = 3] = "PUT";
    HttpMode[HttpMode["PATCH"] = 4] = "PATCH";
})(HttpMode = exports.HttpMode || (exports.HttpMode = {}));
var HttpUri;
(function (HttpUri) {
    HttpUri["create+id+channel+message"] = "/channels/{channel_id}/messages";
    HttpUri["get+id+guild+audit"] = "/guilds/{guild_id}/audit-logs{query}";
    HttpUri["get+id+guild+moderation"] = "/guilds/{guild_id}/auto-moderation/rules";
    HttpUri["get+id+guild+id+moderation"] = "/guilds/{guild_id}/auto-moderation/rules/{moderation_id}";
})(HttpUri = exports.HttpUri || (exports.HttpUri = {}));
var UriMode;
(function (UriMode) {
    UriMode[UriMode["create+id+channel+message"] = 2] = "create+id+channel+message";
    UriMode[UriMode["get+id+guild+audit"] = 0] = "get+id+guild+audit";
    UriMode[UriMode["get+id+guild+moderation"] = 0] = "get+id+guild+moderation";
    UriMode[UriMode["get+id+guild+id+moderation"] = 0] = "get+id+guild+id+moderation";
})(UriMode = exports.UriMode || (exports.UriMode = {}));
