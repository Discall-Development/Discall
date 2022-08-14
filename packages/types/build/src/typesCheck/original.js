"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAny = exports.isLiteral = exports.isUnion = exports.isTypeUndefined = exports.isTypeObject = exports.isTypeRecord = exports.isTypeTuple = exports.isTypeArray = exports.isTypeNull = exports.isFunction = exports.isBoolean = exports.isString = exports.isNumber = void 0;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
exports.isBoolean = isBoolean;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isTypeNull(cb) {
    return function (obj) {
        return obj === null || cb(obj);
    };
}
exports.isTypeNull = isTypeNull;
function isTypeArray(cb) {
    return function (obj) {
        return Array.isArray(obj) && obj.every(cb);
    };
}
exports.isTypeArray = isTypeArray;
function isTypeTuple(...cbs) {
    return function (obj) {
        return Array.isArray(obj) && obj.length === cbs.length && obj.every((v, idx) => cbs[idx](v));
    };
}
exports.isTypeTuple = isTypeTuple;
function isTypeRecord(...pair) {
    return function (obj) {
        return Object.entries(obj).every(([key, value]) => {
            return pair[0](pair[0](0) ? Number(key) : key) && pair[1](value);
        });
    };
}
exports.isTypeRecord = isTypeRecord;
function isTypeObject(pairs) {
    return function (obj) {
        return Object.keys(pairs).every(v => pairs[v](obj[v]));
    };
}
exports.isTypeObject = isTypeObject;
function isTypeUndefined(cb) {
    return function (obj) {
        return obj === undefined || cb(obj);
    };
}
exports.isTypeUndefined = isTypeUndefined;
function isUnion(...cbs) {
    return function (obj) {
        return cbs.some(v => v(obj));
    };
}
exports.isUnion = isUnion;
function isLiteral(value) {
    return function (obj) {
        return obj === value;
    };
}
exports.isLiteral = isLiteral;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isAny(obj) {
    return obj !== undefined;
}
exports.isAny = isAny;
