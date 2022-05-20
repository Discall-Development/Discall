"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUBuffer = void 0;
/**
 * LRUBuffer is a buffer that keeps the last n elements. When it is
 * full and written to, the oldest element in the buffer will be
 * replaced. When reading from the LRUBuffer, elements are returned
 * in FIFO-order (queue).
 *
 * LRUBuffer has linear space- and time-requirements. Internally
 * an array is used as a circular-buffer. All memory is allocated
 * on initialization.
 */
var LRUBuffer = /** @class */ (function () {
    function LRUBuffer(len) {
        this.writePtr = 0;
        this.wrapped = false;
        this.buffer = Array(len);
    }
    LRUBuffer.prototype.len = function () {
        return this.wrapped ? this.buffer.length : this.writePtr;
    };
    LRUBuffer.prototype.cap = function () {
        return this.buffer.length;
    };
    LRUBuffer.prototype.read = function (es) {
        if (es === null || es === undefined || es.length === 0 || this.buffer.length === 0)
            return 0;
        if (this.writePtr === 0 && !this.wrapped)
            return 0;
        var first = this.wrapped ? this.writePtr : 0;
        var last = (first - 1) < 0 ?
            this.buffer.length - 1 :
            first - 1;
        for (var i = 0; i < es.length; i++) {
            var r = (first + i) % this.buffer.length;
            es[i] = this.buffer[r];
            if (r === last)
                return i + 1;
        }
        return es.length;
    };
    LRUBuffer.prototype.write = function (es) {
        if (es === null || es === undefined || es.length === 0 || this.buffer.length === 0)
            return 0;
        var start = es.length > this.buffer.length ? es.length - this.buffer.length : 0;
        for (var i = 0; i < es.length - start; i++) {
            this.buffer[this.writePtr] = es[start + i];
            this.writePtr = (this.writePtr + 1) % this.buffer.length;
            if (this.writePtr === 0)
                this.wrapped = true;
        }
        return es.length;
    };
    LRUBuffer.prototype.forEach = function (fn) {
        if (this.writePtr === 0 && !this.wrapped)
            return 0;
        var cur = this.wrapped ? this.writePtr : 0;
        var last = this.wrapped ? (cur - 1) < 0 ? this.buffer.length - 1 : cur - 1 : this.writePtr - 1;
        var len = this.len();
        while (true) {
            fn(this.buffer[cur]);
            if (cur === last)
                break;
            cur = (cur + 1) % this.buffer.length;
        }
        return len;
    };
    LRUBuffer.prototype.clear = function () {
        this.writePtr = 0;
        this.wrapped = false;
    };
    return LRUBuffer;
}());
exports.LRUBuffer = LRUBuffer;
//# sourceMappingURL=lrubuffer.js.map