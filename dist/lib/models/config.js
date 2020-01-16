"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_MAX_ANCESTOR_LEVEL = 30;
var Config = /** @class */ (function () {
    function Config(props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        this.maxAncestorLevelAllowed = DEFAULT_MAX_ANCESTOR_LEVEL;
        Object.keys(props).forEach(function (key) {
            _this[key] = props[key];
        });
        if (!this.workLoader) {
            this.workLoader = ':FileWorkLoader';
        }
        if (!this.stateManager) {
            this.stateManager = ':MemoryStateManager';
        }
        if (!this.router) {
            this.router = ':MemoryRouter';
        }
        if (!this.logger) {
            this.logger = ':ConsoleLogger';
        }
    }
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=config.js.map