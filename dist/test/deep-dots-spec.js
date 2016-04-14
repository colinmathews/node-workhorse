"use strict";
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var chai_1 = require('chai');
var deep_dots_1 = require('../lib/util/deep-dots');
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
});
//# sourceMappingURL=deep-dots-spec.js.map