import { isAny, isBoolean, isFunction, isLiteral, isNumber, isString, isTypeArray, isTypeNull, isTypeObject, isTypeRecord, isTypeTuple, isTypeUndefined, isUnion } from '../index';

(() => {
    // original test
    console.log('\'\' is number:', isNumber('')); // false
    console.log('---------------------------------------');
    console.log('false is boolean:', isBoolean(false)); // true
    console.log('---------------------------------------');
    console.log('\'\' is string:', isString('')); // true
    console.log('---------------------------------------');
    console.log('[] is function:', isFunction([])); // false
    console.log('---------------------------------------');
    console.log('true is number | null:', isTypeNull(isNumber)(true)); // false
    console.log('---------------------------------------');
    console.log('[true, false, true, true, false] is boolean[]:', isTypeArray(isBoolean)([true, false, true, true, false])); // true
    console.log('---------------------------------------');
    console.log('[1, 2, 3] is [number, number]:', isTypeTuple(isNumber, isNumber)([1, 2, 3])); // false
    console.log('---------------------------------------');
    console.log('[\'\', \'\', \'\'] is Record<number, string>:', isTypeRecord(isNumber, isString)(['', '', ''])); // true
    console.log('---------------------------------------');
    console.log(`{
    a: 1,
    b: false,
    c: ''
} is {
    a: number,
    b: boolean,
    c: string
}:`, isTypeObject({
        a: isNumber,
        b: isBoolean,
        c: isString
    })({ a: 1, b: false, c: '' })); // true
    console.log('---------------------------------------');
    console.log('{} is number | undefined:', isTypeUndefined(isNumber)({})); // false
    console.log('---------------------------------------');
    console.log('false is number | string:', isUnion(isNumber, isString)(false)); // false
    console.log('---------------------------------------');
    console.log('\'abc\' is \'abd\':', isLiteral('abd')('abc')); // false
    console.log('---------------------------------------');
    console.log('1 is any:', isAny(1)); // usually true, expect undefined
    console.log('---------------------------------------');
})();