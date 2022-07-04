export function cacheHas(cache: Map<any, any>, key: any) {
    let idx = 0;
    function MapGet(map: Map<any, any>) {
        idx++;
        if (map)
            return map.get(key[idx - 1]);
    }

    if (Array.isArray(key)) {
        let result: any = cache;
        while (idx !== key.length)
            result = MapGet(result);

        return !!result;
    }

    return cache.has(key);
}

export function cacheSet(cache: Map<any, any>, key: any, data: any) {
    let idx = 0;
    let maps: any[] = [];
    function MapGet(map: Map<any, any>) {
        maps.push(map);
        idx++;
        if (map)
            return map.get(key[idx - 1]);
    }

    function MapSet(map: Map<any, any>, data: any) {
        return map.set(key[--idx], data);
    }

    if (Array.isArray(key)) {
        let result: any = cache;
        while (idx !== key.length)
            result = MapGet(result) || new Map();

        result = data;
        for (const map of maps.reverse())
            result = MapSet(map, result);

        return result;
    }

    return cache.set(key, data);
}

export function cacheDelete(cache: Map<any, any>, key: any) {
    let idx = 0;
    function MapGet(map: Map<any, any>) {
        idx++;
        if (map)
            return map.get(key[idx - 1]);
    }

    function MapDelete(map: Map<any, any>, key: any) {
        if (map)
            return map.delete(key)
        return false;
    }

    if (Array.isArray(key)) {
        let result: any = cache;
        while (idx !== key.length - 1)
            result = MapGet(result);

        return MapDelete(result, key[idx]);
    }

    return cache.delete(key);
}

export function cacheGet(cache: Map<any, any>, key: any) {
    let idx = 0;
    function MapGet(map: Map<any, any>) {
        idx++;
        if (map)
            return map.get(key[idx - 1]);
    }

    if (Array.isArray(key)) {
        let result: any = cache;
        while (idx !== key.length && result) {
            result = MapGet(result);
        }

        return result;
    }

    return cache.get(key);
}