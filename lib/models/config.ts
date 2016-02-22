import WorkLoader from '../interfaces/work-loader';
import StateManager from '../interfaces/state-manager';
import Router from '../interfaces/router';
import Logger from '../interfaces/logger';

export default class Config {
  workLoader: string|WorkLoader;
  stateManager: string|StateManager;
  router: string|Router;
  logger: string|Logger;

  constructor(props: any = {}) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });
    if (!this.workLoader) {
      this.workLoader = 'file-work-loader';
    }
    if (!this.stateManager) {
      this.stateManager = 'memory-state-manager';
    }
    if (!this.router) {
      this.router = 'memory-router';
    }
    if (!this.logger) {
      this.logger = 'console-logger';
    }
  }
}
