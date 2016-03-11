import WorkLoader from '../interfaces/work-loader';
import Runnable from '../interfaces/runnable';
import Workhorse from '../workhorse';
export default class FileWorkLoader implements WorkLoader {
    workhorse: Workhorse;
    getWork(workLoadHref: string): Promise<Runnable>;
}
