"use strict";
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require('chai');
var index_1 = require('../index');
describe('Calculator', function () {
    var subject;
    var baseWorkPath = __dirname + "/test-work/";
    beforeEach(function () {
        subject = new index_1.Workhorse();
        //todo: subject.logger.level = LogLevel.None;
    });
    describe('#run', function () {
        it('should add two numbers', function () {
            return subject.run(baseWorkPath + "calculator", { x: 1, y: 2 })
                .then(function (work) {
                chai_1.assert.isNotNull(work.result);
                chai_1.assert.equal(work.result.result, 3);
            });
        });
        it('should spawn child work', function () {
            return subject.run(baseWorkPath + "calculator", { x: 1, y: 2, twice: true })
                .then(function (work) {
                chai_1.assert.isNotNull(work.result);
                chai_1.assert.equal(work.result.result, 3);
            });
        });
        it('should fail if numbers not used', function () {
            return subject.run(baseWorkPath + "calculator", { x: 'error', y: 2 })
                .then(function (work) {
                chai_1.assert.isNotNull(work.result);
                chai_1.assert.isNull(work.result.result);
                chai_1.assert.isNotNull(work.result.error);
                chai_1.assert.typeOf(work.result.error, 'error');
            });
        });
    });
});
//# sourceMappingURL=calculator.js.map