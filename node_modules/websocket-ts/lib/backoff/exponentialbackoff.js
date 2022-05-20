"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExponentialBackoff = void 0;
/**
 * ExponentialBackoff doubles the backoff with every step until a maximum
 * is reached. This is modelled after the binary exponential-backoff algo-
 * rithm used in computer-networking.
 *
 * The calculation-specification is:
 *          backoff = k * 2^s with s in [1, expMax].
 *
 * Example: for initial=100, expMax=7 the ExponentialBackoff will pro-
 * duce the backoff-series [100, 200, 400, 800, 1600, 3200, 6400].
 */
var ExponentialBackoff = /** @class */ (function () {
    function ExponentialBackoff(initial, expMax) {
        this.initial = initial;
        this.expMax = expMax;
        this.expCurrent = 1;
        this.current = this.initial;
    }
    ExponentialBackoff.prototype.next = function () {
        var backoff = this.current;
        if (this.expMax > this.expCurrent++)
            this.current = this.current * 2;
        return backoff;
    };
    ExponentialBackoff.prototype.reset = function () {
        this.expCurrent = 1;
        this.current = this.initial;
    };
    return ExponentialBackoff;
}());
exports.ExponentialBackoff = ExponentialBackoff;
//# sourceMappingURL=exponentialbackoff.js.map