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
      this.workLoader = 'node-workhorse:FileWorkLoader';
    }
    if (!this.stateManager) {
      this.stateManager = 'node-workhorse:MemoryStateManager';
    }
    if (!this.router) {
      this.router = 'node-workhorse:MemoryRouter';
    }
    if (!this.logger) {
      this.logger = 'node-workhorse:ConsoleLogger';
    }
  }
}
