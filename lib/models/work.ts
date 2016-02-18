import Runnable from '../interfaces/runnable';
import WorkResult from './work-result';
import Driver from '../driver';

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

  clone (): any {
    // let json = JSON.stringify(this, ['id', 'filePath', 'input', 'result', 'finalizerResult', 
    //   'parentID', 'childrenIDs', 'finishedChildrenIDs']);
    let json = JSON.stringify(this);
    return JSON.parse(json);
  }

  prettyPrint (driver: Driver): Promise<any> {
    let json = this.clone();
    delete json.finishedChildrenIDs;

    return driver.state.loadAll(this.childrenIDs)
    .then((children: Work[]) => {
      delete json.childrenIDs;
      json.children = children.map((child) => {
        return child.prettyPrint(driver);
      });
      return json;
    });
  }
}
