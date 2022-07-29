const m = await import("node-fetch");

export module fetch {
    export const fetch = m.default;
    export const Blob = m.Blob;
}