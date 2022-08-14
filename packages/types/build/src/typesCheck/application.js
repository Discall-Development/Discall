"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApplication = exports.isApplicationCommandPermissions = void 0;
const original_1 = require("./original");
const snowflake_1 = require("./snowflake");
function isApplicationCommandPermissions(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        type: original_1.isNumber,
        permission: original_1.isBoolean
    })(obj);
}
exports.isApplicationCommandPermissions = isApplicationCommandPermissions;
function isApplication(obj) {
    return (0, original_1.isTypeObject)({
        id: snowflake_1.isSnowflake,
        name: original_1.isString,
        icon: (0, original_1.isTypeNull)(original_1.isString),
        flags: original_1.isNumber
    })(obj);
}
exports.isApplication = isApplication;
