"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscordData = void 0;
const original_1 = require("./original");
function isDiscordData(obj) {
    return (0, original_1.isTypeObject)({
        op: original_1.isNumber,
        d: (0, original_1.isTypeUndefined)(original_1.isAny),
        s: (0, original_1.isTypeUndefined)(original_1.isNumber),
        t: (0, original_1.isTypeUndefined)(original_1.isString)
    })(obj);
}
exports.isDiscordData = isDiscordData;
