"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
(() => {
    // original test
    console.log('\'\' is number', (0, index_1.isNumber)('')); // false
    console.log('---------------------------------------');
    console.log('false is boolean', (0, index_1.isBoolean)(false)); // true
    console.log('---------------------------------------');
    console.log('\'\' is string', (0, index_1.isString)('')); // true
    console.log('---------------------------------------');
    console.log('[] is function', (0, index_1.isFunction)([])); // false
    console.log('---------------------------------------');
    console.log('true is number | null', (0, index_1.isTypeNull)(index_1.isNumber)(true)); // false
    console.log('---------------------------------------');
    console.log('[true, false, true, true, false] is boolean[]', (0, index_1.isTypeArray)(index_1.isBoolean)([true, false, true, true, false])); // true
    console.log('---------------------------------------');
    console.log('[1, 2, 3] is [number, number]', (0, index_1.isTypeTuple)(index_1.isNumber, index_1.isNumber)([1, 2, 3])); // false
    console.log('---------------------------------------');
    console.log('[\'\', \'\', \'\'] is Record<number, string>', (0, index_1.isTypeRecord)(index_1.isNumber, index_1.isString)(['', '', ''])); // true
    console.log('---------------------------------------');
    console.log(`{
    a: 1,
    b: false,
    c: ''
} is {
    a: number,
    b: boolean,
    c: string
}`, (0, index_1.isTypeObject)({
        a: index_1.isNumber,
        b: index_1.isBoolean,
        c: index_1.isString
    })({ a: 1, b: false, c: '' })); // true
    console.log('---------------------------------------');
    console.log('{} is number | undefined', (0, index_1.isTypeUndefined)(index_1.isNumber)({})); // false
    console.log('---------------------------------------');
    console.log('false is number | string:', (0, index_1.isUnion)(index_1.isNumber, index_1.isString)(false)); // false
    console.log('---------------------------------------');
    console.log('\'abc\' is \'abd\'', (0, index_1.isLiteral)('abd')('abc')); // false
    console.log('---------------------------------------');
    console.log('1 is any', (0, index_1.isAny)(1)); // usually true, expect undefined
    console.log('---------------------------------------');
})();
