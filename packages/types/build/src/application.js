"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCommandPermissionsType = exports.ApplicationFlag = void 0;
var ApplicationFlag;
(function (ApplicationFlag) {
    ApplicationFlag[ApplicationFlag["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    ApplicationFlag[ApplicationFlag["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    ApplicationFlag[ApplicationFlag["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    ApplicationFlag[ApplicationFlag["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    ApplicationFlag[ApplicationFlag["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    ApplicationFlag[ApplicationFlag["EMBEDDED"] = 131072] = "EMBEDDED";
    ApplicationFlag[ApplicationFlag["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    ApplicationFlag[ApplicationFlag["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
})(ApplicationFlag = exports.ApplicationFlag || (exports.ApplicationFlag = {}));
var ApplicationCommandPermissionsType;
(function (ApplicationCommandPermissionsType) {
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["ROLE"] = 1] = "ROLE";
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["USER"] = 2] = "USER";
    ApplicationCommandPermissionsType[ApplicationCommandPermissionsType["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionsType = exports.ApplicationCommandPermissionsType || (exports.ApplicationCommandPermissionsType = {}));
