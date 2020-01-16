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
var child_1 = require("./child");
var GrandChild = /** @class */ (function (_super) {
    __extends(GrandChild, _super);
    function GrandChild() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                },
                childWork: []
            };
        });
    };
    return GrandChild;
}(child_1.default));
exports.default = GrandChild;
//# sourceMappingURL=grand-child.js.map