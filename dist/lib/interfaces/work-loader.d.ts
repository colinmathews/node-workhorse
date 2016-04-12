import Runnable from './runnable';
import Workhorse from '../workhorse';
interface IWorkLoader {
    workhorse: Workhorse;
    getWork: (path: string) => Promise<Runnable>;
}
export default IWorkLoader;
