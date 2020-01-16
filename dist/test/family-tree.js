"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require("chai");
var index_1 = require("../index");
describe('Family Tree', function () {
    var baseWorkPath = __dirname + "/test-work/";
    describe('#run', function () {
        var subject;
        beforeEach(function () {
            subject = new index_1.Workhorse();
            subject.logger.level = index_1.LogLevel.None;
        });
        var sortKidsByIndex = function (children) {
            children.sort(function (a, b) {
                if (a.index === b.index) {
                    return 0;
                }
                return a.index < b.index ? -1 : 1;
            });
        };
        var lastEndDate = function (list) {
            return list.reduce(function (max, row) {
                var childMax = lastEndDate(row.children);
                var date = new Date(row.result.ended);
                if (childMax && childMax > date) {
                    date = childMax;
                }
                if (!max || max < date) {
                    return date;
                }
                return max;
            }, null);
        };
        it('should run deeply', function () {
            return subject.run(baseWorkPath + "parent", { name: 'Colin', kids: 3, grandKids: 2 })
                .then(function (work) {
                chai_1.assert.isNotNull(work.result);
                chai_1.assert.isOk(work.created);
                chai_1.assert.isOk(work.updated);
                return work.deep(subject);
            })
                .then(function (pretty) {
                chai_1.assert.lengthOf(pretty.children, 3);
                sortKidsByIndex(pretty.children);
                chai_1.assert.lengthOf(pretty.children[0].children, 2);
                chai_1.assert.lengthOf(pretty.children[1].children, 2);
                chai_1.assert.isTrue(new Date(pretty.finalizerResult.started) >=
                    lastEndDate(pretty.children), 'The parent finalizer should have started after everyone else finished.');
            });
        });
    });
    describe('#recursion protection', function () {
        var subject;
        beforeEach(function () {
            subject = new index_1.Workhorse(new index_1.Config({
                maxAncestorLevelAllowed: 1
            }));
            subject.logger.level = index_1.LogLevel.None;
        });
        it('should report an error when recursion protection detects trouble', function () {
            return subject.run(baseWorkPath + "parent", { name: 'Colin', kids: 3, grandKids: 2 })
                .then(function (work) {
                chai_1.assert.isNotNull(work.result);
                return work.deep(subject);
            })
                .then(function (pretty) {
                chai_1.assert.lengthOf(pretty.children, 3);
                chai_1.assert.lengthOf(pretty.children[0].children, 0);
                chai_1.assert.isNotNull(pretty.children[0].result.error);
                chai_1.assert.include(pretty.children[0].result.error.message, 'cannot create child work');
                chai_1.assert.isNull(pretty.result.error);
                chai_1.assert.isNotNull(pretty.finalizerResult);
                chai_1.assert.isNull(pretty.finalizerResult.error);
            });
        });
    });
});
//# sourceMappingURL=family-tree.js.map