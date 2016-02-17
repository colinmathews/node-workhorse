import Runnable from '../interfaces/runnable';
import WorkResult from './work-result';

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
}
