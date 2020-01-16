"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require("chai");
var index_1 = require("../index");
describe('ConsoleLogger', function () {
    it('should log error messages', function () {
        var _a = index_1.ConsoleLogger.formatMessage("Hi", new Error("this is a test error")), message = _a[0], level = _a[1];
        chai_1.assert.equal(level, index_1.LogLevel.Error);
        chai_1.assert.isTrue(message.indexOf("this is a test error") >= 0);
    });
});
//# sourceMappingURL=console-logger-spec.js.map