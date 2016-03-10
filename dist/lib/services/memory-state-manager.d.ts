import Work from '../models/work';
import StateManager from '../interfaces/state-manager';
import Workhorse from '../workhorse';
export default class MemoryStateManager implements StateManager {
    workhorse: Workhorse;
    save(work: Work): Promise<any>;
    saveAll(work: Work[]): Promise<any>;
    load(id: string): Promise<Work>;
    loadAll(ids: string[]): Promise<Work[]>;
}
