import pipe, {pipeline} from "..";

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