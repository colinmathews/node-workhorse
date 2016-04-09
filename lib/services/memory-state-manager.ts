import { Promise } from 'es6-promise';
import Work from '../models/work';
import StateManager from '../interfaces/state-manager';
import Workhorse from '../workhorse';

let nextID = 1;
let stateMap = {};

export default class MemoryStateManager implements StateManager {
  workhorse: Workhorse;

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

  saveWorkStarted(work: Work): Promise<any> {
    return this.save(work);
  }

  saveWorkEnded(work: Work): Promise<any> {
    return this.save(work);
  }

  saveFinalizerStarted(work: Work): Promise<any> {
    return this.save(work);
  }

  saveFinalizerEnded(work: Work): Promise<any> {
    return this.save(work);
  }

  saveCreatedChildren(work: Work): Promise<any> {
    return this.save(work);
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

  childWorkFinished(work: Work, parent: Work): Promise<boolean> {
    parent.finishedChildrenIDs.push(work.id);
    let isDone = parent.finishedChildrenIDs.length === parent.childrenIDs.length;
    return this.save(parent)
    .then(() => {
      return isDone;
    });
  }
}
