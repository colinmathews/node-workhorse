import { Promise } from 'es6-promise';
import Work from '../models/work';
import StateManager from '../interfaces/state-manager';
import Driver from '../driver';

let nextID = 1;
let stateMap = {};

export default class MemoryStateManager implements StateManager {
  driver: Driver;

  save (work: Work): Promise<any> {
    if (!work.id) {
      work.id = (nextID++).toString();
    }
    stateMap[work.id] = work;
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

  loadAll (ids: string[]): Promise<Work[]> {
    let promises = ids.map((row) => {
      return this.load(row);
    });
    return Promise.all(promises);
  }
}
