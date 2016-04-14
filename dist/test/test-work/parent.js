"use strict";
var es6_promise_1 = require('es6-promise');
var index_1 = require('../../index');
var Parent = (function () {
    function Parent() {
        this.baseWorkPath = __dirname + "/";
    }
    Parent.prototype.run = function (work) {
        var _this = this;
        return this.randomWait()
            .then(function () {
            return _this.createChildWork(work);
        })
            .then(function (children) {
            return {
                result: {
                    name: work.input.name
                },
                childWork: children
            };
        });
    };
    Parent.prototype.onChildrenDone = function (work) {
        return es6_promise_1.Promise.resolve();
    };
    Parent.prototype.randomWait = function () {
        return new es6_promise_1.Promise(function (ok, fail) {
            var millis = Math.random() * 100;
            setTimeout(function () {
                ok();
            }, millis);
        });
    };
    Parent.prototype.createChildWork = function (work) {
        var count = work.input.kids;
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(new index_1.Work(this.baseWorkPath + "child", {
                index: i,
                name: "Child " + (i + 1),
                kids: work.input.grandKids
            }));
        }
        return list;
    };
    return Parent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Parent;
//# sourceMappingURL=parent.js.map