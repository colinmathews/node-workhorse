"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_loader_1 = require("../util/dynamic-loader");
var FileWorkLoader = /** @class */ (function () {
    function FileWorkLoader() {
    }
    FileWorkLoader.prototype.getWork = function (workLoadHref) {
        return new Promise(function (ok) {
            var instance = dynamic_loader_1.instantiateFromPath(workLoadHref);
            ok(instance);
        });
    };
    return FileWorkLoader;
}());
exports.default = FileWorkLoader;
//# sourceMappingURL=file-work-loader.js.map