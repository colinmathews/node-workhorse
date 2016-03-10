"use strict";
var es6_promise_1 = require('es6-promise');
var log_level_1 = require('../models/log-level');
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (message, level) {
        var _a = ConsoleLogger.formatMessage(message, level), formattedMessage = _a[0], parsedLevel = _a[1];
        // Ignore
        if (this.level && this.level < parsedLevel) {
            return;
        }
        switch (parsedLevel) {
            case log_level_1.default.Debug:
            case log_level_1.default.Info:
            case log_level_1.default.Warn:
                console.log(formattedMessage);
                break;
            case log_level_1.default.Error:
                console.error(formattedMessage);
                break;
            default:
                throw new Error("Unsupported log level: " + parsedLevel);
        }
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
    ConsoleLogger.formatError = function (error) {
        return error.stack;
    };
    ConsoleLogger.formatMessage = function (message, level) {
        var _a = ConsoleLogger.parseLevel(level), parsedLevel = _a[0], err = _a[1];
        var formattedMessage = message;
        if (err) {
            formattedMessage += ": " + ConsoleLogger.formatError(err);
        }
        switch (parsedLevel) {
            case log_level_1.default.Debug:
            case log_level_1.default.Info:
                break;
            case log_level_1.default.Warn:
                formattedMessage = "WARN: " + formattedMessage;
                break;
            case log_level_1.default.Error:
                formattedMessage = "ERROR: " + formattedMessage;
                break;
            default:
                throw new Error("Unsupported log level: " + parsedLevel);
        }
        return [formattedMessage, parsedLevel];
    };
    return ConsoleLogger;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map