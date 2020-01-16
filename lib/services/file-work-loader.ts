import IWorkLoader from '../interfaces/work-loader';
import IRunnable from '../interfaces/runnable';
import Workhorse from '../workhorse';
import { instantiateFromPath } from '../util/dynamic-loader';

export default class FileWorkLoader implements IWorkLoader {
  workhorse: Workhorse;

  getWork(workLoadHref: string): Promise<IRunnable> {
    return new Promise(ok => {
      let instance = instantiateFromPath(workLoadHref);
      ok(instance);
    });
  }
}
