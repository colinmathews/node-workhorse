"use strict";
var fs = require('fs');
var path = require('path');
var deep_dots_1 = require('./deep-dots');
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
    var _a = href.split(':'), modulePath = _a[0], className = _a[1];
    if (!modulePath) {
        modulePath = path.resolve(__dirname, '../../index');
    }
    var oClass = _loadClass(modulePath, className);
    var instance = instantiate(oClass);
    if (!instance) {
        throw new Error("Expected " + href + " to have a prototype");
    }
    return instance;
}
exports.instantiateFromPath = instantiateFromPath;
//# sourceMappingURL=dynamic-loader.js.map