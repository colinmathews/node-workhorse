"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var es6_promise_1 = require('es6-promise');
var index_1 = require('../../index');
var parent_1 = require('./parent');
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        _super.apply(this, arguments);
    }
    Child.prototype.run = function (work) {
        var _this = this;
        var parentName;
        return this.getParentName(work)
            .then(function (result) {
            parentName = result;
            return _this.randomWait();
        })
            .then(function () {
            return _this.createChildWork(work);
        })
            .then(function (children) {
            return {
                result: {
                    parentName: parentName,
                    name: work.input.name
                },
                childWork: children
            };
        });
    };
    Child.prototype.getParentName = function (work) {
        return this.workhorse.state.load(work.parentID)
            .then(function (parent) {
            if (!parent) {
                return null;
            }
            return parent.input.name;
        });
    };
    Child.prototype.createChildWork = function (work) {
        var count = work.input.kids;
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(new index_1.Work(this.baseWorkPath + "grand-child", {
                index: i,
                name: "Grandchild " + (i + 1)
            }));
        }
        return list;
    };
    Child.prototype.onChildrenDone = function (work) {
        return es6_promise_1.Promise.resolve();
    };
    return Child;
}(parent_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Child;
//# sourceMappingURL=child.js.map