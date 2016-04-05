import { Work } from '../../index';
import Workhorse from '../workhorse';
interface StateManager {
    workhorse: Workhorse;
    save: (work: Work) => Promise<any>;
    saveAll: (work: Work[]) => Promise<any>;
    load: (id: string) => Promise<Work>;
    loadAll: (ids: string[]) => Promise<Work[]>;
    childWorkFinished: (work: Work, parent: Work) => Promise<boolean>;
}
export default StateManager;