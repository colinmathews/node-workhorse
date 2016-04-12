import Work from '../models/work';
import IStateManager from '../interfaces/state-manager';
import Workhorse from '../workhorse';
export default class MemoryStateManager implements IStateManager {
    workhorse: Workhorse;
    save(work: Work): Promise<any>;
    saveAll(work: Work[]): Promise<any>;
    saveWorkStarted(work: Work): Promise<any>;
    saveWorkEnded(work: Work): Promise<any>;
    saveFinalizerStarted(work: Work): Promise<any>;
    saveFinalizerEnded(work: Work): Promise<any>;
    saveCreatedChildren(work: Work): Promise<any>;
    load(id: string): Promise<Work>;
    loadAll(ids: string[]): Promise<Work[]>;
    childWorkFinished(work: Work, parent: Work): Promise<boolean>;
}
