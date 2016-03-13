import WorkLoader from '../interfaces/work-loader';
import StateManager from '../interfaces/state-manager';
import Router from '../interfaces/router';
import Logger from '../interfaces/logger';
export default class Config {
    workLoader: string | WorkLoader;
    stateManager: string | StateManager;
    router: string | Router;
    logger: string | Logger;
    maxAncestorLevelAllowed: number;
    constructor(props?: any);
}
