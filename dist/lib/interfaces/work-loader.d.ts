import Runnable from './runnable';
import Workhorse from '../workhorse';
interface WorkLoader {
    workhorse: Workhorse;
    getWork: (path: string) => Promise<Runnable>;
}
export default WorkLoader;
