import IRunnable from '../interfaces/runnable';
import WorkResult from './work-result';
import Workhorse from '../workhorse';
import clone from '../util/clone';
import { cloneInto } from '../util/clone';

export default class Work {
  id: string;
  workLoadHref: string;
  input: any;
  result: WorkResult;
  finalizerResult: WorkResult;
  parentID: string;
  childrenIDs: string[] = [];
  finishedChildrenIDs: string[] = [];
  ancestorLevel: number;
  created: Date;
  updated: Date;
  hasFinalizer: boolean;
  runnable: IRunnable;

  constructor(workLoadHref?: string, input?: any) {
    this.workLoadHref = workLoadHref;
    this.input = input;
    this.ancestorLevel = 0;
  }

  // TODO: Test levelsDeep
  deep(workhorse: Workhorse, levelsDeep: number = Infinity): Promise<any> {
    let json = clone(this);
    delete json.finishedChildrenIDs;

    return workhorse.state.loadAll(this.childrenIDs)
    .then((children: Work[]) => {
      delete json.childrenIDs;
      if (levelsDeep > 0) {
        let promises = children.map((child) => {
          return child.deep(workhorse, levelsDeep - 1);
        });
        return Promise.all(promises)
        .then((result) => {
          json.children = result;
          return json;
        });
      }
    });
  }

  copy(): Work {
    let copy = new Work();
    cloneInto(this, copy);
    return copy;
  }
}
