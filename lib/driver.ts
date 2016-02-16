import WorkLoader from './interfaces/work-loader';
import StateManager from './interfaces/state-manager';
import Runnable from './interfaces/runnable';
import Config from './models/config';
import Work from './models/work';

export default class Driver {
  constructor(public config: Config) {
    if (typeof(config.workLoader) === 'string') {
      config.workLoader = this.loadService(<string>config.workLoader);
    }
    if (typeof(config.stateManager) === 'string') {
      config.stateManager = this.loadService(<string>config.stateManager);
    }
  }

  private loadService<T>(filePath: string) {
    let codePath = `${__dirname}/services/${filePath}`;
    let code = require(codePath);
    return new code.default();
  }

  run(data: Work|string, input: any): Promise<Work> {
    let work: Work;
    if (typeof(data) === 'string') {
      work = new Work({
        filePath: <string>data
      });
    }
    else {
      work = <Work>data;
    }

    let loader = <WorkLoader>this.config.workLoader;
    return loader.loadAllWork(this.config.workFilePath)
    .then(() => {
      return loader.getWork(work.filePath);
    })
    .then((runnable: Runnable) => {
      return this.runWork(work, runnable, input);
    });
  }

  private runWork(work: Work, runnable: Runnable, input: any): Promise<Work> {
    var state = <StateManager>this.config.stateManager;
    work.input = input;
    work.started = new Date();
    work.result = work.error = work.ended = null;
    return state.save(work)
    .then(() => {
      return runnable.run(input)
      .then((result: any) => {
        work.result = result;
      })
      .catch((err: Error) => {
        work.error = err;
        if (runnable.catch) {
          return runnable.catch(err);//todo:?
          // .then((storeError: boolean) => {
          //   if (storeError) {
          //     work.error = err;
          //   }
          // });
        }
      })
      .catch((err: Error) => {
        work.error = err;
      });
    })
    .then(() => {
      work.ended = new Date();
      return state.save(work);
    })
    .then(() => {
      return work;
    });
  }
}
