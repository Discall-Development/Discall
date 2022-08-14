"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.addRemoveable = void 0;
const types_1 = require("@discall/types");
const events = {};
let registered = false;
function listener(ws) {
    if (registered)
        return ws;
    const onMessage = ws.onmessage;
    const onClose = ws.onclose;
    ws.onmessage = async (event) => {
        const data = await onMessage(event);
        if (data.op !== types_1.Opcode.Dispatch)
            return data;
        const eventName = data.t;
        if (events[eventName])
            for (const event of events[eventName]) {
                if (event.check(data.d)) {
                    await event.listen(data.d);
                    if (event.remove)
                        events[eventName] = events[eventName].filter(v => v !== event);
                }
            }
        return data;
    };
    ws.onclose = async (event) => {
        const ws = await onClose(event);
        registered = false;
        return listener(ws);
    };
    registered = true;
    return ws;
}
exports.default = listener;
function addRemoveable({ name, listener, check }) {
    const event = {
        remove: true,
        listen: listener,
        check: check
    };
    if (types_1.EventName[name] !== undefined)
        name = types_1.EventName[name];
    events[name] = events[name] ? [...events[name], event] : [event];
    return event;
}
exports.addRemoveable = addRemoveable;
function register(...event) {
    const _events = [];
    for (const e of event) {
        let { name } = e;
        const { listener, check } = e;
        const event = {
            remove: false,
            listen: listener,
            check: check || (() => true)
        };
        if (types_1.EventName[name] !== undefined)
            name = types_1.EventName[name];
        events[name] = events[name] ? [...events[name], event] : [event];
        _events.push(event);
    }
    return _events;
}
exports.register = register;
