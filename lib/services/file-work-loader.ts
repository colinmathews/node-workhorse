import { Promise } from 'es6-promise';
import WorkLoader from '../interfaces/work-loader'
import Runnable from '../interfaces/runnable';
import Workhorse from '../workhorse';
import dynamicLoader from '../util/dynamic-loader';

export default class FileWorkLoader implements WorkLoader {
  workhorse: Workhorse;

  getWork (workLoadHref: string): Promise<Runnable> {
    return new Promise((ok, fail) => {
      ok(dynamicLoader(workLoadHref));
    });
  }
}
