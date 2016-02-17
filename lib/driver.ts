import { Promise } from 'es6-promise';
import WorkLoader from './interfaces/work-loader';
import StateManager from './interfaces/state-manager';
import Router from './interfaces/router';
import Runnable from './interfaces/runnable';
import Config from './models/config';
import Response from './models/response';
import Work from './models/work';
import WorkResult from './models/work-result';

export default class Driver {
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
  }

  private loadService(filePath: string) {
    let codePath = `${__dirname}/services/${filePath}`;
    let code = require(codePath);
    return new code.default();
  }

  run(data: Work|string, input?: any): Promise<Work> {
    let work: Work = this.normalizeRunData(data, input);;
    let loader = <WorkLoader>this.config.workLoader;
    return loader.loadAllWork(this.config.workFilePath)
    .then(() => {
      return loader.getWork(work.filePath);
    })
    .then((runnable: Runnable) => {
      return this.runWork(work, runnable);
    });
  }

  private normalizeRunData(data: Work|string, input?: any): Work {
    if (typeof(data) === 'string') {
      return new Work(<string>data, input);
    }

    let work: Work = <Work>data;
    if (input) {
      work.input = input;
    }
    return work;
  }

  private runWork(work: Work, runnable: Runnable): Promise<Work> {
    let state = <StateManager>this.config.stateManager;
    let childrenToSpawn: Work[];

    work.result = new WorkResult();
    work.result.start();
    return state.save(work)
    .then(() => {
      return runnable.run(work, this)
      .then((response: Response) => {
        work.result.end(null, response.result);
        childrenToSpawn = response.childWork;
      })
      .catch((err: Error) => {
        work.result.end(err);
      });
    })
    .then(() => {
      return this.afterRun(work, childrenToSpawn);
    });
  }

  private afterRun(work: Work, childrenToSpawn: Work[]): Promise<Work> {
    let state = <StateManager>this.config.stateManager;
    return state.save(work)
    .then(() => {
      if (childrenToSpawn) {
        return this.spawnChildren(work, childrenToSpawn);
      }
    })
    .then(() => {
      return this.onEnded(work);
    })
    .then(() => {
      return work;
    });
  }

  private onEnded(work: Work): Promise<any> {
    if (!work.parentID) {
      return Promise.resolve(null);
    }

    let state = <StateManager>this.config.stateManager;
    let parent: Work;

    return state.load(work.parentID)
    .then((result: Work) => {
      parent = result;
      parent.finishedChildrenIDs.push(work.id);
      return state.save(parent);
    })
    .then(() => {
      if (parent.finishedChildrenIDs.length === parent.childrenIDs.length) {
        return this.checkRunFinalizer(parent);
      }
    });
  }

  private checkRunFinalizer(work: Work): Promise<void> {
    let loader = <WorkLoader>this.config.workLoader;
    return loader.loadAllWork(this.config.workFilePath)
    .then(() => {
      return loader.getWork(work.filePath);
    })
    .then((runnable: Runnable) => {
      if (!runnable.onChildrenDone) {
        return;
      }
      return this.runFinalizer(work, runnable);
    });
  }

  private runFinalizer(work: Work, runnable: Runnable): Promise<any> {
    let state = <StateManager>this.config.stateManager;
    work.finalizerResult = new WorkResult();
    work.finalizerResult.start();
    return state.save(work)
    .then(() => {
      return runnable.onChildrenDone(work, this)
      .then((result: any) => {
        work.finalizerResult.end(null, result);
      })
      .catch((err: Error) => {
        work.finalizerResult.end(err);
      });
    })
    .then(() => {
      return state.save(work);
    });
  }

  private spawnChildren(parent: Work, children: Work[]): Promise<any> {
    let state = <StateManager>this.config.stateManager;
    let router = <Router>this.config.router;

    children.forEach((child) => {
      child.parentID = parent.id;
    });
    return state.saveAll(children)
    .then(() => {
      parent.childrenIDs = children.map((row) => {
        return row.id;
      });
      return state.save(parent);
    })
    .then(() => {
      let promises = children.map((work: Work) => {
        return router.route({ workID: work.id }, this);
      });
      return Promise.all(promises);
    });
  }
}
