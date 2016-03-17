"use strict";
var url = require('url');
var path = require('path');
var WorkloadHrefMeta = (function () {
    function WorkloadHrefMeta(modulePath, className) {
        this.modulePath = modulePath;
        this.className = className;
    }
    WorkloadHrefMeta.parse = function (href) {
        var meta = url.parse(href);
        if (meta.protocol === 'working:') {
            return this.parseWorking(meta);
        }
        return this.parseSimplePath(href);
    };
    WorkloadHrefMeta.parseWorking = function (meta) {
        var filePath = path.join(meta.host, meta.path);
        var resolvedPath = path.resolve(filePath);
        return this.parseSimplePath(resolvedPath);
    };
    WorkloadHrefMeta.parseSimplePath = function (href) {
        var _a = href.split(':'), modulePath = _a[0], className = _a[1];
        if (!modulePath) {
            modulePath = path.resolve(__dirname, '../../index');
        }
        return new WorkloadHrefMeta(modulePath, className);
    };
    return WorkloadHrefMeta;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkloadHrefMeta;
//# sourceMappingURL=workload-href-meta.js.map