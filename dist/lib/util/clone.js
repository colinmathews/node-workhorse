"use strict";
var util = require('util');
// Error instances are special and don't stringify
var errorProperties = ['message', 'name', 'stack', 'fileName', 'lineNumber', 'columnNumber'];
var primitives = ['string', 'boolean', 'number', 'function', 'undefined'];
var MAX_DEPTH = 50;
// http://www.bennadel.com/blog/2664-cloning-regexp-regular-expression-objects-in-javascript.htm
function cloneRegExp(input) {
    var pattern = input.source;
    var flags = "";
    if (input.global) {
        flags += "g";
    }
    if (input.ignoreCase) {
        flags += "i";
    }
    if (input.multiline) {
        flags += "m";
    }
    return (new RegExp(pattern, flags));
}
function clone(source, depth) {
    if (depth === void 0) { depth = 0; }
    if (depth > MAX_DEPTH) {
        throw new Error('Possible circular cloning prevented');
    }
    if (source === null) {
        return null;
    }
    var type = typeof (source);
    if (primitives.indexOf(type) >= 0) {
        return source;
    }
    if (util.isDate(source)) {
        return new Date(source.valueOf());
    }
    if (util.isArray(source)) {
        return source.map(function (row) {
            return clone(row, depth + 1);
        });
    }
    if (util.isRegExp(source)) {
        return cloneRegExp(source);
    }
    if (util.isError(source)) {
        var dest_1 = Object.keys(source).reduce(function (result, key) {
            result[key] = clone(source[key], depth + 1);
            return result;
        }, {});
        errorProperties.forEach(function (key) {
            dest_1[key] = source[key];
        });
        return dest_1;
    }
    if (type !== 'object') {
        throw new Error("Unexpected type: " + type);
    }
    return Object.keys(source).reduce(function (result, key) {
        result[key] = clone(source[key], depth + 1);
        return result;
    }, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clone;
function cloneInto(source, dest) {
    var copy = clone(source);
    var props = Object.keys(copy);
    props.forEach(function (key) {
        dest[key] = copy[key];
    });
}
exports.cloneInto = cloneInto;
//# sourceMappingURL=clone.js.map