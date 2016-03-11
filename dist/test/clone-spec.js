"use strict";
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require('chai');
var Work_1 = require('../lib/models/Work');
var clone_1 = require('../lib/util/clone');
var clone_2 = require('../lib/util/clone');
describe('Clone', function () {
    it('should duplicate an object without sharing references', function () {
        var source = {
            a: 'hi',
            b: [1, 2],
            c: new Object()
        };
        var dest = clone_1.default(source);
        chai_1.assert.equal(dest.a, source.a);
        chai_1.assert.notEqual(dest.b, source.b);
        chai_1.assert.lengthOf(dest.b, source.b.length);
        chai_1.assert.equal(dest.b[0], source.b[0]);
        chai_1.assert.notEqual(dest.c, source.c);
    });
    it('should clone into a specific class type', function () {
        var source = new Work_1.default('testing', {
            a: 'hi',
            b: [1, 2],
            c: new Object()
        });
        var dest = new Work_1.default();
        clone_2.cloneInto(source, dest);
        chai_1.assert.notEqual(dest.input, source.input);
        chai_1.assert.equal(dest.input.a, source.input.a);
        chai_1.assert.notEqual(dest.input.b, source.input.b);
        chai_1.assert.lengthOf(dest.input.b, source.input.b.length);
        chai_1.assert.equal(dest.input.b[0], source.input.b[0]);
        chai_1.assert.notEqual(dest.input.c, source.input.c);
    });
});
//# sourceMappingURL=clone-spec.js.map