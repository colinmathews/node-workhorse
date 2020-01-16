"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(source, path) {
    var dots = path.split('.');
    var target = source;
    if (target === null || typeof (target) === 'undefined') {
        return null;
    }
    while (dots.length > 0) {
        target = target[dots[0]];
        if (target === null || typeof (target) === 'undefined') {
            return null;
        }
        dots = dots.slice(1);
    }
    return target;
}
exports.default = default_1;
//# sourceMappingURL=deep-dots.js.map