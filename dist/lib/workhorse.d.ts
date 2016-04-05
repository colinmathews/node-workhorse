import WorkLoader from './interfaces/work-loader';
import StateManager from './interfaces/state-manager';
import Logger from './interfaces/logger';
import Router from './interfaces/router';
import Config from './models/config';
import Work from './models/work';
export default class Workhorse {
    config: Config;
    constructor(config?: Config);
    private loadService(serviceHref);
    state: StateManager;
    loader: WorkLoader;
    router: Router;
    logger: Logger;
    route(data: Work | string, input?: any): Promise<Work>;
    run(data: Work | string, input?: any): Promise<Work>;
    runFinalizer(work: Work): Promise<Work>;
    private normalizeRunData(data, input?);
    private runWork(work, runnable);
    private afterRun(work, childrenToSpawn);
    private onEnded(work, endType);
    private checkRunFinalizer(work);
    private runFinalizerWork(work, runnable);
    private isAllowedToSpawnChildren(work, childrenToSpawn?);
    private spawnChildren(parent, children);
}
