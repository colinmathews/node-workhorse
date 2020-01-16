"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var Parent = /** @class */ (function () {
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
    Parent.prototype.onChildrenDone = function (_work) {
        return Promise.resolve();
    };
    Parent.prototype.randomWait = function () {
        return new Promise(function (ok) {
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
exports.default = Parent;
//# sourceMappingURL=parent.js.map