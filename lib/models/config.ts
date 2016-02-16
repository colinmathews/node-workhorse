import WorkLoader from '../interfaces/work-loader';
import StateManager from '../interfaces/state-manager';

export default class Config {
  workFilePath: string;
  workLoader: string|WorkLoader;
  stateManager: string|StateManager;

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
  }
}
