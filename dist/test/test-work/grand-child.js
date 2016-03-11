"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var child_1 = require('./child');
var GrandChild = (function (_super) {
    __extends(GrandChild, _super);
    function GrandChild() {
        _super.apply(this, arguments);
    }
    GrandChild.prototype.run = function (work) {
        var _this = this;
        var parentName;
        var grandParentName;
        return this.getParentName(work)
            .then(function (result) {
            parentName = result;
            return _this.workhorse.state.load(work.parentID);
        })
            .then(function (parent) {
            return _this.getParentName(parent);
        })
            .then(function (result) {
            grandParentName = result;
            return _this.randomWait();
        })
            .then(function () {
            return {
                result: {
                    grandParentName: grandParentName,
                    parentName: parentName,
                    name: work.input.name
                }
            };
        });
    };
    return GrandChild;
}(child_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GrandChild;
//# sourceMappingURL=grand-child.js.map