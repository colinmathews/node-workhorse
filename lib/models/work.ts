import Runnable from '../interfaces/runnable';
import WorkResult from './work-result';
import Workhorse from '../workhorse';
import clone from '../util/clone';

export default class Work {
  id: string;
  filePath: string;
  input: any;
  result: WorkResult;
  finalizerResult: WorkResult;
  parentID: string;
  childrenIDs: string[] = [];
  finishedChildrenIDs: string[] = [];

  runnable: Runnable;

  constructor(filePath?: string, input?: any) {
    this.filePath = filePath;
    this.input = input;
  }

  prettyPrint (workhorse: Workhorse): Promise<any> {
    let json = clone(this);
    delete json.finishedChildrenIDs;

    return workhorse.state.loadAll(this.childrenIDs)
    .then((children: Work[]) => {
      delete json.childrenIDs;
      let promises = children.map((child) => {
        return child.prettyPrint(workhorse);
      });
      return Promise.all(promises)
      .then((children) => {
        json.children = children;
        return json;
      });
    });
  }
}
