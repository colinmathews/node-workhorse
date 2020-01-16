"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require("chai");
var Work_1 = require("../lib/models/Work");
var clone_1 = require("../lib/util/clone");
var clone_2 = require("../lib/util/clone");
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
    it('should clone error objects', function () {
        var source = new Error('Hi');
        var dest = clone_1.default(source);
        chai_1.assert.notEqual(dest, source);
        chai_1.assert.equal(dest.message, source.message);
        chai_1.assert.equal(dest.stack, source.stack);
    });
    it('should clone dates', function () {
        var source = { x: new Date() };
        var dest = clone_1.default(source);
        chai_1.assert.notEqual(dest, source);
        chai_1.assert.instanceOf(dest.x, Date);
        chai_1.assert.notEqual(dest.x, source.x);
        chai_1.assert.equal(dest.x.valueOf(), source.x.valueOf());
    });
    it('should clone regular expressions', function () {
        var source = { x: /blah/i };
        var dest = clone_1.default(source);
        chai_1.assert.notEqual(dest, source);
        chai_1.assert.instanceOf(dest.x, RegExp);
        chai_1.assert.notEqual(dest.x, source.x);
        chai_1.assert.isTrue(dest.x.test('Blah'));
    });
    it('should deep clone', function () {
        var source = {
            one: [1, {
                    two: [{
                            date: new Date()
                        }]
                }],
            three: {
                reg: /hi/
            },
            four: true
        };
        var dest = clone_1.default(source);
        chai_1.assert.notEqual(dest, source);
        chai_1.assert.lengthOf(dest.one, source.one.length);
        chai_1.assert.instanceOf(dest.one[1].two[0].date, Date);
        chai_1.assert.instanceOf(dest.three.reg, RegExp);
        chai_1.assert.isTrue(dest.four === true);
    });
    it('should prevent cloning of circlular references', function () {
        var source = {
            a: []
        };
        source.a.push(source);
        var fn = function () { return clone_1.default(source); };
        chai_1.assert.throws(fn);
    });
});
//# sourceMappingURL=clone-spec.js.map