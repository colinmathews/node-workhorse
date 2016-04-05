"use strict";
var clone_1 = require('../util/clone');
var clone_2 = require('../util/clone');
var Work = (function () {
    function Work(workLoadHref, input) {
        this.childrenIDs = [];
        this.finishedChildrenIDs = [];
        this.workLoadHref = workLoadHref;
        this.input = input;
        this.ancestorLevel = 0;
    }
    // TODO: Test levelsDeep
    Work.prototype.deep = function (workhorse, levelsDeep) {
        if (levelsDeep === void 0) { levelsDeep = Infinity; }
        var json = clone_1.default(this);
        delete json.finishedChildrenIDs;
        return workhorse.state.loadAll(this.childrenIDs)
            .then(function (children) {
            delete json.childrenIDs;
            if (levelsDeep > 0) {
                var promises = children.map(function (child) {
                    return child.deep(workhorse, levelsDeep - 1);
                });
                return Promise.all(promises)
                    .then(function (children) {
                    json.children = children;
                    return json;
                });
            }
        });
    };
    Work.prototype.copy = function () {
        var copy = new Work();
        clone_2.cloneInto(this, copy);
        return copy;
    };
    return Work;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Work;
//# sourceMappingURL=work.js.map