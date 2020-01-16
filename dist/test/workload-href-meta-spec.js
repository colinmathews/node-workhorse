"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require("chai");
var path = require("path");
var workload_href_meta_1 = require("../lib/models/workload-href-meta");
describe('WorkloadHrefMeta', function () {
    it('should parse working protocol', function () {
        var result = workload_href_meta_1.default.parse('working://module-name/lives/here:class-name');
        chai_1.assert.isNotNull(result);
        chai_1.assert.equal(result.modulePath, path.resolve('module-name/lives/here'));
        chai_1.assert.equal(result.className, 'class-name');
    });
    it('should parse a npm installed module', function () {
        var result = workload_href_meta_1.default.parse('some-package:className');
        chai_1.assert.isNotNull(result);
        chai_1.assert.equal(result.modulePath, 'some-package');
        chai_1.assert.equal(result.className, 'className');
    });
    it('should parse a node-workhorse module', function () {
        var result = workload_href_meta_1.default.parse(':ConsoleLogger');
        chai_1.assert.isNotNull(result);
        chai_1.assert.equal(result.modulePath, path.resolve(__dirname, '../../dist/index'));
        chai_1.assert.equal(result.className, 'ConsoleLogger');
    });
});
//# sourceMappingURL=workload-href-meta-spec.js.map