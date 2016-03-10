"use strict";
function default_1(source, path) {
    var dots = path.split('.');
    var target = source;
    while (dots.length > 0) {
        target = source[dots[0]];
        dots = dots.slice(1);
    }
    return target;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=deep-dots.js.map