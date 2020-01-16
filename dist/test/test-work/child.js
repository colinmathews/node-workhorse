"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var parent_1 = require("./parent");
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    Child.prototype.onChildrenDone = function (_work) {
        return Promise.resolve();
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
    return Child;
}(parent_1.default));
exports.default = Child;
//# sourceMappingURL=child.js.map