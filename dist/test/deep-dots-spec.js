"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require("chai");
var deep_dots_1 = require("../lib/util/deep-dots");
describe('Deep dots', function () {
    it('should reach into nested properties', function () {
        var source = {
            ports: {
                common: 1,
                accounts: 2
            }
        };
        var dest = deep_dots_1.default(source, 'ports.common');
        chai_1.assert.equal(dest, 1);
    });
    it('should get a first-level path', function () {
        var source = {
            a: 'cracker',
            ports: {
                common: 1,
                accounts: 2
            }
        };
        var dest = deep_dots_1.default(source, 'a');
        chai_1.assert.equal(dest, 'cracker');
    });
    it('should return nothing when any part of path does not exist', function () {
        var source = {
            a: 'cracker',
            deep1: {
                deep2: {
                    value3: 'blah'
                },
                accounts: 2
            }
        };
        var dest = deep_dots_1.default(source, 'deep1.thisdoesnotexist.value3');
        chai_1.assert.isNull(dest);
    });
});
//# sourceMappingURL=deep-dots-spec.js.map