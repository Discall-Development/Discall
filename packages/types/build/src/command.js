"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPermissionsFlag = void 0;
var CommandPermissionsFlag;
(function (CommandPermissionsFlag) {
    CommandPermissionsFlag[CommandPermissionsFlag["OWNER"] = 1] = "OWNER";
    CommandPermissionsFlag[CommandPermissionsFlag["ADMINISTRATOR"] = 2] = "ADMINISTRATOR";
    CommandPermissionsFlag[CommandPermissionsFlag["BOT"] = 4] = "BOT";
    CommandPermissionsFlag[CommandPermissionsFlag["ROLE"] = 8] = "ROLE";
    CommandPermissionsFlag[CommandPermissionsFlag["MEMBER"] = 16] = "MEMBER";
    CommandPermissionsFlag[CommandPermissionsFlag["GROUP"] = 32] = "GROUP";
    CommandPermissionsFlag[CommandPermissionsFlag["USER"] = 64] = "USER";
})(CommandPermissionsFlag = exports.CommandPermissionsFlag || (exports.CommandPermissionsFlag = {}));
