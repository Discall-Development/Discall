"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApplication = exports.isApplicationCommandPermissions = void 0;
function isApplicationCommandPermissions(obj) {
    let keys = ["id", "type", "permission"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplicationCommandPermissions = isApplicationCommandPermissions;
function isApplication(obj) {
    let keys = ["id", "name", "icon", "flags"];
    return Object.keys(obj).filter((v) => !keys.includes(v)).length === 0;
}
exports.isApplication = isApplication;
