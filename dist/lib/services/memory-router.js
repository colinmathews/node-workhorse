"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryRouter = /** @class */ (function () {
    function MemoryRouter() {
    }
    MemoryRouter.prototype.route = function (options) {
        var _this = this;
        return this.workhorse.state.load(options.workID)
            .then(function (work) {
            return _this.workhorse.run(work);
        })
            .then(function () {
            return null;
        });
    };
    MemoryRouter.prototype.routeFinalizer = function (options) {
        var _this = this;
        return this.workhorse.state.load(options.workID)
            .then(function (work) {
            return _this.workhorse.runFinalizer(work);
        })
            .then(function () {
            return null;
        });
    };
    return MemoryRouter;
}());
exports.default = MemoryRouter;
//# sourceMappingURL=memory-router.js.map