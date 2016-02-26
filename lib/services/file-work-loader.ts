import { Promise } from 'es6-promise';
import WorkLoader from '../interfaces/work-loader'
import Runnable from '../interfaces/runnable';
import Workhorse from '../workhorse';
import { instantiate, instantiateFromPath } from '../util/dynamic-loader';

export default class FileWorkLoader implements WorkLoader {
  workhorse: Workhorse;

  getWork (workLoadHref: string): Promise<Runnable> {
    return new Promise((ok, fail) => {
      let instance = instantiateFromPath(workLoadHref);
      ok(instance);
    });
  }
}
