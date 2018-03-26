import { Promise } from 'es6-promise';
import IWorkLoader from './interfaces/work-loader';
import IStateManager from './interfaces/state-manager';
import ILogger from './interfaces/logger';
import IRouter from './interfaces/router';
import IRunnable from './interfaces/runnable';
import Config from './models/config';
import Response from './models/response';
import Route from './models/route';
import Work from './models/work';
import WorkResult from './models/work-result';
import LogLevel from './models/log-level';
import { instantiate, instantiateFromPath } from './util/dynamic-loader';

export default class Workhorse {
  constructor(public config: Config = new Config()) {
    if (typeof(config.workLoader) === 'string') {
      config.workLoader = this.loadService(<string>config.workLoader);
    }
    if (typeof(config.stateManager) === 'string') {
      config.stateManager = this.loadService(<string>config.stateManager);
    }
    if (typeof(config.router) === 'string') {
      config.router = this.loadService(<string>config.router);
    }
    if (typeof(config.logger) === 'string') {
      config.logger = this.loadService(<string>config.logger);
    }
    (<IWorkLoader>config.workLoader).workhorse = this;
    (<IStateManager>config.stateManager).workhorse = this;
    (<IRouter>config.router).workhorse = this;
    (<ILogger>config.logger).workhorse = this;
  }

  private loadService(serviceHref: string) {
    return instantiateFromPath(serviceHref);
  }

  get state() {
    let obj = <IStateManager>this.config.stateManager;
    obj.workhorse = this;
    return obj;
  }

  get loader() {
    let obj = <IWorkLoader>this.config.workLoader;
    obj.workhorse = this;
    return obj;
  }

  get router() {
    let obj = <IRouter>this.config.router;
    obj.workhorse = this;
    return obj;
  }

  get logger() {
    let obj = <ILogger>this.config.logger;
    obj.workhorse = this;
    return obj;
  }

  route(data:Work|string, input?: any): Promise<Work> {
    let work;
    return this.normalizeRunData(data, input)
    .then((result) => {
      work = result;
      return this.router.route(new Route({ workID: work.id }));
    })
    .then((result) => {
      return work;
    });
  }

  run(data: Work|string, input?: any): Promise<Work> {
    let work: Work;

    return this.normalizeRunData(data, input)
    .then((result) => {
      work = result;
      this.logger.log(`Loading work: ${work.workLoadHref}:${work.id}`);
      return this.loader.getWork(work.workLoadHref)
    })
    .then((runnable: IRunnable) => {
      runnable.workhorse = this;
      return this.runWork(work, runnable);
    });
  }

  runFinalizer(work: Work): Promise<Work> {
    return this.loader.getWork(work.workLoadHref)
    .then((runnable: IRunnable) => {
      return this.runFinalizerWork(work, runnable);
    })
    .then(() => {
      return work;
    });
  }

  private normalizeRunData(data: Work|string, input?: any): Promise<Work> {
    if (typeof(data) === 'string') {
      let work = new Work(<string>data, input);
      return this.state.save(work)
      .then(() => {
        return work;
      });
    }

    let work: Work = <Work>data;
    if (input) {
      work.input = input;
      return this.state.save(work)
      .then(() => {
        return work;
      });
    }
    return Promise.resolve(work);
  }

  private runWork(work: Work, runnable: IRunnable): Promise<Work> {
    let childrenToSpawn: Work[];
    work.hasFinalizer = !!runnable.onChildrenDone;
    work.result = new WorkResult();
    work.result.start();
    return Promise.resolve()
      .then(() => {
        if (work.hasFinalizer) {
          return this.state.save(work);
        }
      })
      .then(() => this.state.saveWorkStarted(work))
      .then(() => {
        this.logger.logOutsideWork(work, 'Running work');
        return this.wrapRunnable(work, runnable)
          .then((response: Response) => {
            this.logger.logOutsideWork(work, 'Work succeeded');
            work.result.end(null, response.result);
            childrenToSpawn = response.childWork;
            if (!this.isAllowedToSpawnChildren(work, childrenToSpawn)) {
              childrenToSpawn = [];
              throw new Error('Recursion protection: cannot create child work because an ancestor level of ' +
                `${work.ancestorLevel + 1} exceeds the configured value of ${this.config.maxAncestorLevelAllowed}`);
            }
          })
          .catch((err: Error) => {
            this.logger.logOutsideWork(work, 'Work failed', err);
            work.result.end(err);
          });
      })
      .then(() => {
        return this.afterRun(work, childrenToSpawn);
      });
  }

  private wrapRunnable(work: Work, runnable: IRunnable): Promise<Response> {
    try {
      return runnable.run(work);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }

  private afterRun(work: Work, childrenToSpawn: Work[]): Promise<Work> {
    return this.state.saveWorkEnded(work)
    .then(() => {
      if (childrenToSpawn) {
        return this.spawnChildren(work, childrenToSpawn);
      }
    })
    .then(() => {
      return this.logger.flush();
    })
    .then(() => {
      return this.onEnded(work, 'run');
    })
    .then(() => {
      return work;
    });
  }

  private onEnded(work: Work, endType: string): Promise<any> {
    return Promise.resolve()
    .then(() => {
      if (endType === 'run') {
        return this.logger.workEnded(work);
      }
    })
    .then(() => {
      if (!work.parentID) {
        return;
      }

      // If this work has children, we have to wait until they're done
      if (endType === 'run' && work.childrenIDs.length > 0) {
        return;
      }

      let parent: Work;
      return this.state.load(work.parentID)
      .then((result: Work) => {
        parent = result;
        return this.state.childWorkFinished(work, parent);
      })
      .then((isDone) => {
        if (isDone) {
          return this.checkRunFinalizer(parent);
        }
      });
    });
  }

  private checkRunFinalizer(work: Work): Promise<void> {
    if (!work.hasFinalizer) {
      this.logger.logOutsideWork(work, 'All children are done, but no finalizer is defined');
      return this.onEnded(work, 'children-done-no-finalizer');
    }
    this.logger.logOutsideWork(work, `Routing finalizer`);
    return this.router.routeFinalizer({ workID: work.id });
  }

  private runFinalizerWork(work: Work, runnable: IRunnable): Promise<any> {
    work.finalizerResult = new WorkResult();
    work.finalizerResult.start();
    return this.state.saveFinalizerStarted(work)
    .then(() => {
      this.logger.logOutsideWork(work, 'Starting finalizer');
      runnable.workhorse = this;
      return runnable.onChildrenDone(work)
      .then((result: any) => {
        this.logger.logOutsideWork(work, 'Finalizer succeeded');
        work.finalizerResult.end(null, result);
      })
      .catch((err: Error) => {
        this.logger.logOutsideWork(work, 'Finalizer failed', err);
        work.finalizerResult.end(err);
      });
    })
    .then(() => {
      return this.logger.finalizerRan(work);
    })
    .then(() => {
      return this.state.saveFinalizerEnded(work);
    })
    .then(() => {
      return this.onEnded(work, 'finalizer');
    });
  }

  private isAllowedToSpawnChildren(work: Work, childrenToSpawn: Work[] = []) {
    if (childrenToSpawn.length > 0 && work.ancestorLevel >= this.config.maxAncestorLevelAllowed) {
      return false;
    }
    return true;
  }

  private spawnChildren(parent: Work, children: Work[]): Promise<any> {
    children.forEach((child) => {
      child.parentID = parent.id;
      child.ancestorLevel = parent.ancestorLevel + 1;
    });
    return this.state.saveAll(children)
    .then(() => {
      parent.childrenIDs = children.map((row) => {
        return row.id;
      });
      return this.state.saveCreatedChildren(parent);
    })
    .then(() => {
      let promises = children.map((work: Work) => {
        this.logger.logOutsideWork(parent, `Routing child work: ${work.workLoadHref}:${work.id}`);
        return this.router.route({ workID: work.id });
      });
      return Promise.all(promises);
    });
  }
}
