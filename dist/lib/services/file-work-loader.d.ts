import IWorkLoader from '../interfaces/work-loader';
import IRunnable from '../interfaces/runnable';
import Workhorse from '../workhorse';
export default class FileWorkLoader implements IWorkLoader {
    workhorse: Workhorse;
    getWork(workLoadHref: string): Promise<IRunnable>;
}
