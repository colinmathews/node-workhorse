"use strict";
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 1] = "None";
    LogLevel[LogLevel["Debug"] = 2] = "Debug";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Warn"] = 4] = "Warn";
    LogLevel[LogLevel["Error"] = 5] = "Error";
})(LogLevel || (LogLevel = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogLevel;
//# sourceMappingURL=log-level.js.map