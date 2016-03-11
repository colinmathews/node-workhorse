"use strict";
function clone(source) {
    var json = JSON.stringify(source);
    return JSON.parse(json);
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