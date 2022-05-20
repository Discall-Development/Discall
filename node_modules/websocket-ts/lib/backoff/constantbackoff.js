"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantBackoff = void 0;
/**
 * ConstantBackoff always returns the same value.
 */
var ConstantBackoff = /** @class */ (function () {
    function ConstantBackoff(backoff) {
        this.reset = function () {
            // no-op
        };
        this.backoff = backoff;
    }
    ConstantBackoff.prototype.next = function () {
        return this.backoff;
    };
    return ConstantBackoff;
}());
exports.ConstantBackoff = ConstantBackoff;
//# sourceMappingURL=constantbackoff.js.map