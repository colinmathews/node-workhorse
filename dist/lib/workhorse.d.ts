import IWorkLoader from './interfaces/work-loader';
import IStateManager from './interfaces/state-manager';
import ILogger from './interfaces/logger';
import IRouter from './interfaces/router';
import Config from './models/config';
import Work from './models/work';
export default class Workhorse {
    config: Config;
    constructor(config?: Config);
    private loadService;
    get state(): IStateManager;
    get loader(): IWorkLoader;
    get router(): IRouter;
    get logger(): ILogger;
    route(data: Work | string, input?: any): Promise<Work>;
    run(data: Work | string, input?: any): Promise<Work>;
    runFinalizer(work: Work): Promise<Work>;
    private normalizeRunData;
    private runWork;
    private wrapRunnable;
    private afterRun;
    private onEnded;
    private checkRunFinalizer;
    private runFinalizerWork;
    private isAllowedToSpawnChildren;
    private spawnChildren;
}
