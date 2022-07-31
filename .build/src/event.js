"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.addRemoveable = void 0;
const typo_1 = require("./typo");
let events = {};
let registered = false;
function listener(ws) {
    if (registered)
        return ws;
    let onMessage = ws.onmessage;
    ws.onmessage = async (event) => {
        let data = await onMessage(event);
        if (data.op !== typo_1.Opcode.Dispatch)
            return data;
        let eventName = data.t?.toLowerCase();
        if (events[eventName])
            for (const event of events[eventName]) {
                if (event.check(data)) {
                    await event.listen(data);
                    if (event.remove)
                        events[eventName] = events[eventName].filter(v => v !== event);
                }
            }
        return data;
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
    events[name] = events[name] ? [...events[name], event] : [event];
    return event;
}
exports.addRemoveable = addRemoveable;
function register({ name, listener, check }) {
    let event = {
        remove: false,
        listen: listener,
        check: check || (_ => true)
    };
    events[name] = events[name] ? [...events[name], event] : [event];
    return event;
}
exports.register = register;
