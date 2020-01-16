"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.errors = [];
        this.baseWorkPath = __dirname + "/";
    }
    Calculator.prototype.run = function (work) {
        var _this = this;
        return new Promise(function (ok, fail) {
            var input = work.input;
            if (typeof (input.x) !== 'number' || typeof (input.y) !== 'number') {
                return fail(new Error('Inputs must be numbers'));
            }
            var children;
            if (input.twice) {
                children = _this.createChildWork(input);
            }
            ok({
                result: input.x + input.y,
                childWork: children
            });
        });
    };
    Calculator.prototype.onChildrenDone = function (_work) {
        return Promise.resolve();
    };
    Calculator.prototype.createChildWork = function (input) {
        return [new index_1.Work(this.baseWorkPath + "calculator", {
                x: input.x,
                y: input.y
            })];
    };
    return Calculator;
}());
exports.default = Calculator;
//# sourceMappingURL=calculator.js.map