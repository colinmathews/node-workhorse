import IWorkLoader from '../interfaces/work-loader';
import IStateManager from '../interfaces/state-manager';
import IRouter from '../interfaces/router';
import ILogger from '../interfaces/logger';

const DEFAULT_MAX_ANCESTOR_LEVEL: number = 30;

export default class Config {
  public workLoader: string | IWorkLoader;
  public stateManager: string | IStateManager;
  public router: string | IRouter;
  public logger: string | ILogger;
  public maxAncestorLevelAllowed: number;

  constructor(props: any = {}) {
    this.maxAncestorLevelAllowed = DEFAULT_MAX_ANCESTOR_LEVEL;
    Object.keys(props).forEach((key: string) => {
      this[key] = props[key];
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
}
