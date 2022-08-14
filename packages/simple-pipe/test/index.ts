import pipe, {pipeline} from '..';

const map = function <T>(arr: Array<T>, cb: Parameters<Array<T>['map']>[0]): ReturnType<typeof cb> {
    return arr.map(cb);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function promiseTest(arr: any[]): Promise<typeof arr> {
    return new Promise((resolve) => {
        const iter = arr[Symbol.iterator]();
        setInterval(function _() {
            const obj = iter.next();
            if (obj.done)
                resolve(arr);
        }, 100);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
);

console.log(
    await pipeline(
        [map, (v: number) => v * 2],
        promiseTest,
        asyncTest,
        (arr: number[]) => [...arr, 40]
    ).execute([1, 2, 3])
);