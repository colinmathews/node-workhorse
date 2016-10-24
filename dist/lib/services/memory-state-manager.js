"use strict";
var es6_promise_1 = require('es6-promise');
var MemoryStateManager = (function () {
    function MemoryStateManager() {
        this.nextID = 1;
        this.stateMap = {};
    }
    MemoryStateManager.prototype.save = function (work) {
        if (!work.id) {
            work.id = (this.nextID++).toString();
        }
        if (!work.created) {
            work.created = new Date();
        }
        work.updated = new Date();
        this.stateMap[work.id] = work;
        return es6_promise_1.Promise.resolve(null);
    };
    MemoryStateManager.prototype.saveAll = function (work) {
        var _this = this;
        var promises = work.map(function (row) {
            return _this.save(row);
        });
        return es6_promise_1.Promise.all(promises)
            .then(function () {
            return null;
        });
    };
    MemoryStateManager.prototype.saveWorkStarted = function (work) {
        return this.save(work);
    };
    MemoryStateManager.prototype.saveWorkEnded = function (work) {
        return this.save(work);
    };
    MemoryStateManager.prototype.saveFinalizerStarted = function (work) {
        return this.save(work);
    };
    MemoryStateManager.prototype.saveFinalizerEnded = function (work) {
        return this.save(work);
    };
    MemoryStateManager.prototype.saveCreatedChildren = function (work) {
        return this.save(work);
    };
    MemoryStateManager.prototype.load = function (id) {
        var work = this.stateMap[id];
        return es6_promise_1.Promise.resolve(work);
    };
    MemoryStateManager.prototype.loadAll = function (ids) {
        var _this = this;
        var promises = ids.map(function (row) {
            return _this.load(row);
        });
        return es6_promise_1.Promise.all(promises);
    };
    MemoryStateManager.prototype.childWorkFinished = function (work, parent) {
        parent.finishedChildrenIDs.push(work.id);
        var isDone = parent.finishedChildrenIDs.length === parent.childrenIDs.length;
        return this.save(parent)
            .then(function () {
            return isDone;
        });
    };
    return MemoryStateManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoryStateManager;
//# sourceMappingURL=memory-state-manager.js.map