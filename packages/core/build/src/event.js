"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.addRemoveable = void 0;
const types_1 = require("@discall/types");
let events = {};
let registered = false;
function listener(ws) {
    if (registered)
        return ws;
    let onMessage = ws.onmessage;
    let onClose = ws.onclose;
    ws.onmessage = async (event) => {
        let data = await onMessage(event);
        if (data.op !== types_1.Opcode.Dispatch)
            return data;
        let eventName = data.t;
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
        let ws = await onClose(event);
        registered = false;
        return listener(ws);
    };
    registered = true;
    return ws;
}
exports.default = listener;
function addRemoveable({ name, listener, check }) {
    let event = {
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
    let _events = [];
    for (let { name, listener, check } of event) {
        let event = {
            remove: false,
            listen: listener,
            check: check || (_ => true)
        };
        if (types_1.EventName[name] !== undefined)
            name = types_1.EventName[name];
        events[name] = events[name] ? [...events[name], event] : [event];
        _events.push(event);
    }
    return _events;
}
exports.register = register;
