import { Promise } from 'es6-promise';
import Work from '../models/work';
import StateManager from '../interfaces/state-manager';

let nextID = 1;
let stateMap = {};

export default class MemoryStateManager implements StateManager {
  save (work: Work): Promise<any> {
    if (!work.id) {
      work.id = (nextID++).toString();
    }
    stateMap[work.id] = work;
    console.log('todo: ' + JSON.stringify(stateMap, null, 2));
    return Promise.resolve(null);
  }

  saveAll (work: Work[]): Promise<any> {
    let promises = work.map((row) => {
      return this.save(row);
    });
    return Promise.all(promises)
    .then(() => {
      return null;
    });
  }

  load (id: string): Promise<Work> {
    let work = stateMap[id];
    return Promise.resolve(work);
  }
}
