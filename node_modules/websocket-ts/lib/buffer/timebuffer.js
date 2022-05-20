"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBuffer = void 0;
/**
 * TimeBuffer keeps the elements that were written to the buffer
 * within maxAge milliseconds. For example, to  keep items in the
 * buffer that are less than a minute old, create the buffer with
 * maxAge equal to 60.000.
 *
 * When reading from the TimeBuffer, elements will be returned
 * in FIFO-order (queue).
 */
var TimeBuffer = /** @class */ (function () {
    function TimeBuffer(maxAge) {
        this.maxAge = maxAge;
    }
    TimeBuffer.prototype.cap = function () {
        return Number.POSITIVE_INFINITY;
    };
    TimeBuffer.prototype.len = function () {
        this.forwardTail();
        var cur = this.tail;
        var i = 0;
        while (cur !== undefined) {
            i++;
            cur = cur.n;
        }
        return i;
    };
    TimeBuffer.prototype.read = function (es) {
        this.forwardTail();
        if (es.length === 0)
            return 0;
        var cur = this.tail;
        var i = 0;
        while (cur !== undefined) {
            es[i++] = cur.e;
            if (i === es.length)
                break;
            cur = cur.n;
        }
        return i;
    };
    TimeBuffer.prototype.write = function (es) {
        for (var i = 0; i < es.length; i++)
            this.putElement(es[i]);
        return es.length;
    };
    TimeBuffer.prototype.forEach = function (fn) {
        this.forwardTail();
        var cur = this.tail;
        var i = 0;
        while (cur !== undefined) {
            fn(cur.e);
            i++;
            cur = cur.n;
        }
        return i;
    };
    TimeBuffer.prototype.putElement = function (e) {
        var newElement = { e: e, t: Date.now(), n: undefined };
        if (this.tail === undefined)
            this.tail = newElement;
        if (this.head === undefined)
            this.head = newElement;
        else {
            this.head.n = newElement;
            this.head = newElement;
        }
    };
    TimeBuffer.prototype.forwardTail = function () {
        if (this.tail === undefined)
            return;
        var d = Date.now();
        while (d - this.tail.t > this.maxAge) {
            if (this.tail === this.head) {
                this.tail = undefined;
                this.head = undefined;
            }
            else
                this.tail = this.tail.n;
            if (this.tail === undefined)
                break;
        }
    };
    TimeBuffer.prototype.clear = function () {
        // TODO
    };
    return TimeBuffer;
}());
exports.TimeBuffer = TimeBuffer;
//# sourceMappingURL=timebuffer.js.map