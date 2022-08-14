"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(format, params, ...args) {
    let type;
    if (!args) {
        if (typeof params === 'string')
            type = 'string';
        else
            type = 'key';
    }
    else {
        if (typeof params === 'string')
            type = 'array';
        else
            type = 'key+array';
    }
    switch (type) {
        case 'string':
            return format.replace(/{(\d+)}/g, (match, number) => {
                if (number == 0)
                    return params;
                return match;
            });
        case 'key':
            return format.replace(/{(\w+)}/g, (match, key) => {
                if (key in params)
                    return params[key];
                return match;
            });
        case 'array':
            return format.replace(/{(\d+)}/g, (match, number) => {
                if (number == 0)
                    return params;
                return args[number - 1] ? args[number - 1] : match;
            });
        case 'key+array':
            return format.replace(/{(\w+)}/g, (match, key) => {
                if (key in params)
                    return params[key];
                return match;
            }).replace(/{(\d+)}/g, (match, number) => {
                return args[number] ? args[number] : match;
            });
    }
}
exports.default = format;
