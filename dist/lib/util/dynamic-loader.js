"use strict";
var deep_dots_1 = require('./deep-dots');
var workload_href_meta_1 = require('../models/workload-href-meta');
var _loadClass = function (modulePath, className) {
    var oClass = require(modulePath);
    if (!oClass) {
        throw new Error("Could not find module " + modulePath);
    }
    if (className) {
        oClass = deep_dots_1.default(oClass, className);
        if (!oClass) {
            throw new Error("Could not find class " + className + " in module " + modulePath);
        }
    }
    return oClass;
};
function instantiate(oClass) {
    'use strict';
    if (!oClass.prototype) {
        oClass = oClass.default;
    }
    if (!oClass.prototype) {
        return null;
    }
    var instance = Object.create(oClass.prototype);
    if (instance.constructor) {
        instance.constructor.apply(instance);
    }
    return instance;
}
exports.instantiate = instantiate;
function instantiateFromPath(href) {
    'use strict';
    var meta = workload_href_meta_1.default.parse(href);
    var oClass = _loadClass(meta.modulePath, meta.className);
    var instance = instantiate(oClass);
    if (!instance) {
        throw new Error("Expected " + href + " to have a prototype");
    }
    return instance;
}
exports.instantiateFromPath = instantiateFromPath;
//# sourceMappingURL=dynamic-loader.js.map