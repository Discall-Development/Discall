# @discall/types
types of discall interface and checkers

check most of types you want.

## Example
---
```ts
isNumber(1) // true
isNumber('') // false

isUnion(isNumber, isString)(item) // item is number | string

isTypeTuple(isNumber, isNumber)(item) // item is [number, number]

isTypeArray(isBoolean)(item) // item is boolean[]

// more thins:
/*
    isFunction,
    isTypeNull,
    isTypeUndefined,
    isTypeRecord,
    isTypeObject,
    isLiteral,
    isAny,

    and Discall interfaces
*/
```