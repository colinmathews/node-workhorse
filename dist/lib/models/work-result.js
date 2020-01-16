"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkResult = /** @class */ (function () {
    function WorkResult() {
    }
    WorkResult.prototype.start = function () {
        this.result = this.error = this.ended = null;
        this.started = new Date();
    };
    WorkResult.prototype.end = function (err, result) {
        if (err) {
            this.error = err;
        }
        if (result) {
            this.result = result;
        }
        this.ended = new Date();
    };
    return WorkResult;
}());
exports.default = WorkResult;
//# sourceMappingURL=work-result.js.map