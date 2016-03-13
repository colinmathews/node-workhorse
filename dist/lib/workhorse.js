"use strict";
var es6_promise_1 = require('es6-promise');
var config_1 = require('./models/config');
var route_1 = require('./models/route');
var work_1 = require('./models/work');
var work_result_1 = require('./models/work-result');
var dynamic_loader_1 = require('./util/dynamic-loader');
var Workhorse = (function () {
    function Workhorse(config) {
        if (config === void 0) { config = new config_1.default(); }
        this.config = config;
        if (typeof (config.workLoader) === 'string') {
            config.workLoader = this.loadService(config.workLoader);
        }
        if (typeof (config.stateManager) === 'string') {
            config.stateManager = this.loadService(config.stateManager);
        }
        if (typeof (config.router) === 'string') {
            config.router = this.loadService(config.router);
        }
        if (typeof (config.logger) === 'string') {
            config.logger = this.loadService(config.logger);
        }
        config.workLoader.workhorse = this;
        config.stateManager.workhorse = this;
        config.router.workhorse = this;
        config.logger.workhorse = this;
    }
    Workhorse.prototype.loadService = function (serviceHref) {
        return dynamic_loader_1.instantiateFromPath(serviceHref);
    };
    Object.defineProperty(Workhorse.prototype, "state", {
        get: function () {
            var obj = this.config.stateManager;
            obj.workhorse = this;
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workhorse.prototype, "loader", {
        get: function () {
            var obj = this.config.workLoader;
            obj.workhorse = this;
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workhorse.prototype, "router", {
        get: function () {
            var obj = this.config.router;
            obj.workhorse = this;
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workhorse.prototype, "logger", {
        get: function () {
            var obj = this.config.logger;
            obj.workhorse = this;
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Workhorse.prototype.route = function (data, input) {
        var _this = this;
        var work;
        return this.normalizeRunData(data, input)
            .then(function (result) {
            work = result;
            return _this.router.route(new route_1.default({ workID: work.id }));
        })
            .then(function (result) {
            return work;
        });
    };
    Workhorse.prototype.run = function (data, input) {
        var _this = this;
        var work;
        return this.normalizeRunData(data, input)
            .then(function (result) {
            work = result;
            _this.logger.log("Loading work: " + work.workLoadHref + ":" + work.id);
            return _this.loader.getWork(work.workLoadHref);
        })
            .then(function (runnable) {
            runnable.workhorse = _this;
            return _this.runWork(work, runnable);
        });
    };
    Workhorse.prototype.runFinalizer = function (work) {
        var _this = this;
        return this.loader.getWork(work.workLoadHref)
            .then(function (runnable) {
            return _this.runFinalizerWork(work, runnable);
        })
            .then(function () {
            return work;
        });
    };
    Workhorse.prototype.normalizeRunData = function (data, input) {
        if (typeof (data) === 'string') {
            var work_2 = new work_1.default(data, input);
            return this.state.save(work_2)
                .then(function () {
                return work_2;
            });
        }
        var work = data;
        if (input) {
            work.input = input;
            return this.state.save(work)
                .then(function () {
                return work;
            });
        }
        return es6_promise_1.Promise.resolve(work);
    };
    Workhorse.prototype.runWork = function (work, runnable) {
        var _this = this;
        var childrenToSpawn;
        work.result = new work_result_1.default();
        work.result.start();
        return this.state.save(work)
            .then(function () {
            _this.logger.logOutsideWork(work, 'Running work');
            return runnable.run(work)
                .then(function (response) {
                _this.logger.logOutsideWork(work, 'Work succeeded');
                work.result.end(null, response.result);
                childrenToSpawn = response.childWork;
                if (!_this.isAllowedToSpawnChildren(work, childrenToSpawn)) {
                    childrenToSpawn = [];
                    throw new Error('Recursion protection: cannot create child work because an ancestor level of ' +
                        ((work.ancestorLevel + 1) + " exceeds the configured value of " + _this.config.maxAncestorLevelAllowed));
                }
            })
                .catch(function (err) {
                _this.logger.logOutsideWork(work, 'Work failed', err);
                work.result.end(err);
            });
        })
            .then(function () {
            return _this.afterRun(work, childrenToSpawn);
        });
    };
    Workhorse.prototype.afterRun = function (work, childrenToSpawn) {
        var _this = this;
        return this.state.save(work)
            .then(function () {
            if (childrenToSpawn) {
                return _this.spawnChildren(work, childrenToSpawn);
            }
        })
            .then(function () {
            return _this.logger.flush();
        })
            .then(function () {
            return _this.onEnded(work);
        })
            .then(function () {
            return work;
        });
    };
    Workhorse.prototype.onEnded = function (work) {
        var _this = this;
        return this.logger.workEnded(work)
            .then(function () {
            if (!work.parentID) {
                return;
            }
            var parent;
            var isDone;
            return _this.state.load(work.parentID)
                .then(function (result) {
                parent = result;
                parent.finishedChildrenIDs.push(work.id);
                isDone = parent.finishedChildrenIDs.length === parent.childrenIDs.length;
                return _this.state.save(parent);
            })
                .then(function () {
                if (isDone) {
                    return _this.checkRunFinalizer(parent);
                }
            });
        });
    };
    Workhorse.prototype.checkRunFinalizer = function (work) {
        var _this = this;
        return this.loader.getWork(work.workLoadHref)
            .then(function (runnable) {
            if (!runnable.onChildrenDone) {
                _this.logger.logOutsideWork(work, 'All children are done, but no finalizer is defined');
                return;
            }
            _this.logger.logOutsideWork(work, "Routing finalizer");
            return _this.router.routeFinalizer({ workID: work.id });
        });
    };
    Workhorse.prototype.runFinalizerWork = function (work, runnable) {
        var _this = this;
        work.finalizerResult = new work_result_1.default();
        work.finalizerResult.start();
        return this.state.save(work)
            .then(function () {
            _this.logger.logOutsideWork(work, 'Starting finalizer');
            runnable.workhorse = _this;
            return runnable.onChildrenDone(work)
                .then(function (result) {
                _this.logger.logOutsideWork(work, 'Finalizer succeeded');
                work.finalizerResult.end(null, result);
            })
                .catch(function (err) {
                _this.logger.logOutsideWork(work, 'Finalizer failed', err);
                work.finalizerResult.end(err);
            });
        })
            .then(function () {
            return _this.logger.finalizerRan(work);
        })
            .then(function () {
            return _this.state.save(work);
        });
    };
    Workhorse.prototype.isAllowedToSpawnChildren = function (work, childrenToSpawn) {
        if (childrenToSpawn === void 0) { childrenToSpawn = []; }
        if (childrenToSpawn.length > 0 && work.ancestorLevel >= this.config.maxAncestorLevelAllowed) {
            return false;
        }
        return true;
    };
    Workhorse.prototype.spawnChildren = function (parent, children) {
        var _this = this;
        children.forEach(function (child) {
            child.parentID = parent.id;
            child.ancestorLevel = parent.ancestorLevel + 1;
        });
        return this.state.saveAll(children)
            .then(function () {
            parent.childrenIDs = children.map(function (row) {
                return row.id;
            });
            return _this.state.save(parent);
        })
            .then(function () {
            var promises = children.map(function (work) {
                _this.logger.logOutsideWork(parent, "Routing child work: " + work.workLoadHref + ":" + work.id);
                return _this.router.route({ workID: work.id });
            });
            return es6_promise_1.Promise.all(promises);
        });
    };
    return Workhorse;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Workhorse;
//# sourceMappingURL=workhorse.js.map