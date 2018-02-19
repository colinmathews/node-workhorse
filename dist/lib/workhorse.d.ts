import IWorkLoader from './interfaces/work-loader';
import IStateManager from './interfaces/state-manager';
import ILogger from './interfaces/logger';
import IRouter from './interfaces/router';
import Config from './models/config';
import Work from './models/work';
export default class Workhorse {
    config: Config;
    constructor(config?: Config);
    private loadService(serviceHref);
    state: IStateManager;
    loader: IWorkLoader;
    router: IRouter;
    logger: ILogger;
    route(data: Work | string, input?: any): Promise<Work>;
    run(data: Work | string, input?: any): Promise<Work>;
    runFinalizer(work: Work): Promise<Work>;
    private normalizeRunData(data, input?);
    private runWork(work, runnable);
    private wrapRunnable(work, runnable);
    private afterRun(work, childrenToSpawn);
    private onEnded(work, endType);
    private checkRunFinalizer(work);
    private runFinalizerWork(work, runnable);
    private isAllowedToSpawnChildren(work, childrenToSpawn?);
    private spawnChildren(parent, children);
}
