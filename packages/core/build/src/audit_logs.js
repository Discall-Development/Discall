"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function auditLogs(filters) {
    if ((0, utils_1.isEmpty)(filters))
        return {
            type: 'audit',
            data: {
                query: '',
                data: {}
            }
        };
    return {
        type: 'audit',
        data: {
            query: `?${Object.entries(filters).map(([key, value]) => {
                return `${key}=${value}`;
            }).join('&')}`,
            data: {}
        }
    };
}
exports.default = auditLogs;
