"use strict";
var Route = (function () {
    function Route(props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        Object.keys(props).forEach(function (key) {
            _this[key] = props[key];
        });
    }
    return Route;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Route;
//# sourceMappingURL=route.js.map