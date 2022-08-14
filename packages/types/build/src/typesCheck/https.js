"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdData = exports.isHttpRequestData = exports.isHttpRequest = void 0;
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
function isHttpRequest(obj) {
    return (0, original_1.isTypeObject)({
        uri: original_1.isFunction,
        data: (0, original_1.isTypeUndefined)(original_1.isAny),
        cache: (0, original_1.isTypeUndefined)(original_1.isFunction),
        reason: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isHttpRequest = isHttpRequest;
function isHttpRequestData(obj) {
    return (0, original_1.isTypeObject)({
        type: original_1.isString,
        data: (0, original_1.isUnion)(isHttpRequestData, isIdData, original_1.isAny)
    })(obj);
}
exports.isHttpRequestData = isHttpRequestData;
function isIdData(obj) {
    return (0, original_1.isTypeObject)({
        guild_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        channel_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        message_id: (0, original_1.isTypeUndefined)(snowflake_1.isSnowflake),
        data: isHttpRequestData
    })(obj);
}
exports.isIdData = isIdData;
