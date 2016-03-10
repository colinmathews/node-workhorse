"use strict";
var clone_1 = require('../util/clone');
var Work = (function () {
    function Work(workLoadHref, input) {
        this.childrenIDs = [];
        this.finishedChildrenIDs = [];
        this.workLoadHref = workLoadHref;
        this.input = input;
    }
    Work.prototype.deep = function (workhorse) {
        var json = clone_1.default(this);
        delete json.finishedChildrenIDs;
        return workhorse.state.loadAll(this.childrenIDs)
            .then(function (children) {
            delete json.childrenIDs;
            var promises = children.map(function (child) {
                return child.deep(workhorse);
            });
            return Promise.all(promises)
                .then(function (children) {
                json.children = children;
                return json;
            });
        });
    };
    return Work;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Work;
//# sourceMappingURL=work.js.map