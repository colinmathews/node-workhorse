"use strict";
var es6_promise_1 = require('es6-promise');
var log_level_1 = require('../models/log-level');
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (message, level) {
        var err;
        _a = ConsoleLogger.parseLevel(level), level = _a[0], err = _a[1];
        var formattedMessage = ConsoleLogger.formatMessage(message, level);
        // Ignore
        if (this.level && this.level < level) {
            return;
        }
        switch (level) {
            case log_level_1.default.Debug:
            case log_level_1.default.Info:
            case log_level_1.default.Warn:
                console.log(formattedMessage);
                break;
            case log_level_1.default.Error:
                console.error(formattedMessage);
                break;
            default:
                throw new Error("Unsupported log level: " + level);
        }
        var _a;
    };
    ConsoleLogger.prototype.logInsideWork = function (work, message, level) {
        return this.log(message + ": " + work.workLoadHref + ":" + work.id, level);
    };
    ConsoleLogger.prototype.logOutsideWork = function (work, message, level) {
        return this.log(message + ": " + work.workLoadHref + ":" + work.id, level);
    };
    ConsoleLogger.prototype.workEnded = function () {
        return es6_promise_1.Promise.resolve();
    };
    ConsoleLogger.prototype.flush = function () {
        return es6_promise_1.Promise.resolve();
    };
    ConsoleLogger.parseLevel = function (level) {
        var err;
        if (level instanceof Error) {
            err = level;
            level = log_level_1.default.Error;
        }
        if (!level) {
            level = log_level_1.default.Info;
        }
        return [level, err];
    };
    ConsoleLogger.formatMessage = function (message, level) {
        var err;
        _a = ConsoleLogger.parseLevel(level), level = _a[0], err = _a[1];
        var formattedMessage = message;
        if (err) {
            formattedMessage += ": " + err.message;
        }
        switch (level) {
            case log_level_1.default.Debug:
            case log_level_1.default.Info:
                return formattedMessage;
            case log_level_1.default.Warn:
                return "WARN: " + formattedMessage;
            case log_level_1.default.Error:
                return "ERROR: " + formattedMessage;
            default:
                throw new Error("Unsupported log level: " + level);
        }
        var _a;
    };
    return ConsoleLogger;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map