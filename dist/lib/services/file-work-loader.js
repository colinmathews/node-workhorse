"use strict";
var es6_promise_1 = require('es6-promise');
var dynamic_loader_1 = require('../util/dynamic-loader');
var FileWorkLoader = (function () {
    function FileWorkLoader() {
    }
    FileWorkLoader.prototype.getWork = function (workLoadHref) {
        return new es6_promise_1.Promise(function (ok, fail) {
            var instance = dynamic_loader_1.instantiateFromPath(workLoadHref);
            ok(instance);
        });
    };
    return FileWorkLoader;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileWorkLoader;
//# sourceMappingURL=file-work-loader.js.map