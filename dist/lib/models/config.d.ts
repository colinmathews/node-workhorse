import IWorkLoader from '../interfaces/work-loader';
import IStateManager from '../interfaces/state-manager';
import IRouter from '../interfaces/router';
import ILogger from '../interfaces/logger';
export default class Config {
    workLoader: string | IWorkLoader;
    stateManager: string | IStateManager;
    router: string | IRouter;
    logger: string | ILogger;
    maxAncestorLevelAllowed: number;
    constructor(props?: any);
}
