"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPresenceUpdate = exports.isUser = exports.isClientStatus = exports.isActivityButtons = exports.isActivitySecrets = exports.isActivityAssets = exports.isActivityParty = exports.isActivityEmoji = exports.isActivityTimestamp = exports.isActivity = void 0;
const channel_1 = require("./channel");
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
function isActivity(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        type: original_1.isNumber,
        url: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        created_at: original_1.isNumber,
        timestamps: (0, original_1.isTypeUndefined)(isActivityTimestamp),
        application_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        details: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        state: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        emoji: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(isActivityEmoji)),
        party: (0, original_1.isTypeUndefined)(isActivityParty),
        assets: (0, original_1.isTypeUndefined)(isActivityAssets),
        secrets: (0, original_1.isTypeUndefined)(isActivitySecrets),
        instance: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        flags: original_1.isNumber,
        buttons: (0, original_1.isTypeUndefined)(isActivityButtons),
    })(obj);
}
exports.isActivity = isActivity;
function isActivityTimestamp(obj) {
    return (0, original_1.isTypeObject)({
        start: (0, original_1.isTypeUndefined)(original_1.isNumber),
        end: (0, original_1.isTypeUndefined)(original_1.isNumber)
    })(obj);
}
exports.isActivityTimestamp = isActivityTimestamp;
function isActivityEmoji(obj) {
    return (0, original_1.isTypeObject)({
        name: original_1.isString,
        id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        animated: (0, original_1.isTypeUndefined)(original_1.isBoolean)
    })(obj);
}
exports.isActivityEmoji = isActivityEmoji;
function isActivityParty(obj) {
    return (0, original_1.isTypeObject)({
        id: (0, original_1.isTypeUndefined)(original_1.isString),
        size: (0, original_1.isTypeUndefined)((0, original_1.isTypeTuple)(original_1.isNumber, original_1.isNumber))
    })(obj);
}
exports.isActivityParty = isActivityParty;
function isActivityAssets(obj) {
    return (0, original_1.isTypeObject)({
        large_image: (0, original_1.isTypeUndefined)(original_1.isString),
        large_text: (0, original_1.isTypeUndefined)(original_1.isString),
        small_image: (0, original_1.isTypeUndefined)(original_1.isString),
        small_text: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isActivityAssets = isActivityAssets;
function isActivitySecrets(obj) {
    return (0, original_1.isTypeObject)({
        join: (0, original_1.isTypeUndefined)(original_1.isString),
        spectate: (0, original_1.isTypeUndefined)(original_1.isString),
        match: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isActivitySecrets = isActivitySecrets;
function isActivityButtons(obj) {
    return (0, original_1.isTypeObject)({
        label: original_1.isString,
        url: original_1.isString
    })(obj);
}
exports.isActivityButtons = isActivityButtons;
function isClientStatus(obj) {
    return (0, original_1.isTypeObject)({
        desktop: (0, original_1.isTypeUndefined)(original_1.isString),
        mobile: (0, original_1.isTypeUndefined)(original_1.isString),
        web: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isClientStatus = isClientStatus;
function isUser(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        username: original_1.isString,
        discriminator: original_1.isString,
        avatar: (0, original_1.isTypeNull)(original_1.isString),
        bot: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        system: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        mfa_enabled: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        banner: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        accent_color: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isNumber)),
        locale: (0, original_1.isTypeUndefined)(channel_1.isLocaleOption),
        verified: (0, original_1.isTypeUndefined)(original_1.isBoolean),
        email: (0, original_1.isTypeUndefined)((0, original_1.isTypeNull)(original_1.isString)),
        flags: (0, original_1.isTypeUndefined)(original_1.isNumber),
        premium_type: (0, original_1.isTypeUndefined)(original_1.isNumber),
        public_flags: (0, original_1.isTypeUndefined)(original_1.isNumber),
    })(obj);
}
exports.isUser = isUser;
function isPresenceUpdate(obj) {
    return (0, original_1.isTypeObject)({
        user: isUser,
        guild_id: snowflake_1.isSnowflake,
        status: original_1.isString,
        activities: (0, original_1.isTypeArray)(isActivity),
        client_status: isClientStatus
    })(obj);
}
exports.isPresenceUpdate = isPresenceUpdate;
