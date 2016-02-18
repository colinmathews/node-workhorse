import { Promise } from 'es6-promise';
import WorkLoader from './interfaces/work-loader';
import StateManager from './interfaces/state-manager';
import Logger from './interfaces/logger';
import Router from './interfaces/router';
import Runnable from './interfaces/runnable';
import Config from './models/config';
import Response from './models/response';
import Work from './models/work';
import WorkResult from './models/work-result';
import LogLevel from './models/log-level';

export default class Workhorse {
  constructor(public config: Config) {
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
  }

  private loadService(filePath: string) {
    let codePath = `${__dirname}/services/${filePath}`;
    let code = require(codePath);
    let instance = new code.default();
    instance.workhorse = this;
    return instance;
  }

  get state() {
    return <StateManager>this.config.stateManager;
  }

  get loader() {
    return <WorkLoader>this.config.workLoader;
  }

  get router() {
    return <Router>this.config.router;
  }

  get logger() {
    return <Logger>this.config.logger;
  }

  run(data: Work|string, input?: any): Promise<Work> {
    let work: Work;

    return this.normalizeRunData(data, input)
    .then((result) => {
      work = result;
      this.logger.log(`Loading work: ${work.filePath}:${work.id}`);
      return this.loader.loadAllWork(this.config.workFilePath);
    })
    .then(() => {
      return this.loader.getWork(work.filePath);
    })
    .then((runnable: Runnable) => {
      runnable.workhorse = this;
      return this.runWork(work, runnable);
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

  private runWork(work: Work, runnable: Runnable): Promise<Work> {
    let childrenToSpawn: Work[];

    work.result = new WorkResult();
    work.result.start();
    return this.state.save(work)
    .then(() => {
      this.logger.logForWork(work, 'Running work');
      return runnable.run(work)
      .then((response: Response) => {
        this.logger.logForWork(work, 'Work succeeded');
        work.result.end(null, response.result);
        childrenToSpawn = response.childWork;
      })
      .catch((err: Error) => {
        this.logger.logForWork(work, 'Work failed', err);
        work.result.end(err);
      });
    })
    .then(() => {
      return this.afterRun(work, childrenToSpawn);
    });
  }

  private afterRun(work: Work, childrenToSpawn: Work[]): Promise<Work> {
    return this.state.save(work)
    .then(() => {
      if (childrenToSpawn) {
        return this.spawnChildren(work, childrenToSpawn);
      }
    })
    .then(() => {
      return this.onEnded(work);
    })
    .then(() => {
      return this.logger.flush();
    })
    .then(() => {
      return work;
    });
  }

  private onEnded(work: Work): Promise<any> {
    if (!work.parentID) {
      return Promise.resolve(null);
    }

    let parent: Work;
    return this.state.load(work.parentID)
    .then((result: Work) => {
      parent = result;
      parent.finishedChildrenIDs.push(work.id);
      return this.state.save(parent);
    })
    .then(() => {
      if (parent.finishedChildrenIDs.length === parent.childrenIDs.length) {
        return this.checkRunFinalizer(parent);
      }
    });
  }

  private checkRunFinalizer(work: Work): Promise<void> {
    return this.loader.loadAllWork(this.config.workFilePath)
    .then(() => {
      return this.loader.getWork(work.filePath);
    })
    .then((runnable: Runnable) => {
      if (!runnable.onChildrenDone) {
        this.logger.logForWork(work, 'All children are done, but no finalizer is defined');
        return;
      }
      // TODO: This should call router, not run the work ourselves
      return this.runFinalizer(work, runnable);
    });
  }

  private runFinalizer(work: Work, runnable: Runnable): Promise<any> {
    work.finalizerResult = new WorkResult();
    work.finalizerResult.start();
    return this.state.save(work)
    .then(() => {
      this.logger.logForWork(work, 'Starting finalizer');
      return runnable.onChildrenDone(work)
      .then((result: any) => {
        this.logger.logForWork(work, 'Finalizer succeeded');
        work.finalizerResult.end(null, result);
      })
      .catch((err: Error) => {
        this.logger.logForWork(work, 'Finalizer failed', err);
        work.finalizerResult.end(err);
      });
    })
    .then(() => {
      return this.state.save(work);
    });
  }

  private spawnChildren(parent: Work, children: Work[]): Promise<any> {
    children.forEach((child) => {
      child.parentID = parent.id;
    });
    return this.state.saveAll(children)
    .then(() => {
      parent.childrenIDs = children.map((row) => {
        return row.id;
      });
      return this.state.save(parent);
    })
    .then(() => {
      let promises = children.map((work: Work) => {
        this.logger.logForWork(parent, `Routing child work: ${work.filePath}:${work.id}`);
        return this.router.route({ workID: work.id });
      });
      return Promise.all(promises);
    });
  }
}