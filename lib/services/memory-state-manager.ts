import Work from '../models/work';
import StateManager from '../interfaces/state-manager';

let nextID = 1;
let stateMap = {};

export default class MemoryStateManager implements StateManager {
  save (work: Work): Promise<void> {
    if (!work.id) {
      work.id = (nextID++).toString();
    }
    stateMap[work.id] = work;
    return Promise.resolve(null);
  }

  load (id: string): Promise<Work> {
    let work = stateMap[id];
    return Promise.resolve(work);
  }
}
