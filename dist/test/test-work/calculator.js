"use strict";
var es6_promise_1 = require('es6-promise');
var index_1 = require('../../index');
var Calculator = (function () {
    function Calculator() {
        this.errors = [];
        this.baseWorkPath = __dirname + "/";
    }
    Calculator.prototype.run = function (work) {
        var _this = this;
        return new es6_promise_1.Promise(function (ok, fail) {
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
    Calculator.prototype.onChildrenDone = function (work) {
        return es6_promise_1.Promise.resolve();
    };
    Calculator.prototype.createChildWork = function (input) {
        return [new index_1.Work(this.baseWorkPath + "calculator", {
                x: input.x,
                y: input.y
            })];
    };
    return Calculator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Calculator;
//# sourceMappingURL=calculator.js.map