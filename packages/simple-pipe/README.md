# simple-pipe
a simple pipe function

## Why should I use simple-pipe
- Support async function
- very light and result storable
- two mode for use
- if have promise, must use `await` or `.then`

## Install
```
npm i @discall/simple-pipe
```
```
bun add @discall/simple-pipe
```

## Usage
```ts
import pipe, {pipeline} from "@discall/simple-pipe";

const map = function <T>(arr: Array<T>, cb: Parameters<Array<T>["map"]>[0]): ReturnType<typeof cb> {
    return arr.map(cb);
}

function promiseTest(arr: any[]) {
    return new Promise((resolve, _) => {
        let iter = arr[Symbol.iterator]();
        setInterval(function _() {
            let obj = iter.next();
            if (obj.done)
                resolve(arr);
        }, 100);
    });
}

async function asyncTest(arr: any[]) {
    return arr;
}

console.log(
    await pipe([1, 2, 3])
        .pipe(map, (v: number) => v * 2)
        .pipe(promiseTest)
        .pipe(asyncTest)
        .pipe((arr: number[]) => [...arr, 40])
        .execute()
)

console.log(
    await pipeline(
        [map, (v: number) => v * 2],
        promiseTest,
        asyncTest,
        (arr: number[]) => [...arr, 40]
    ).execute([1, 2, 3])
)
```