import Runnable from '../interfaces/runnable';
import WorkResult from './work-result';
import Workhorse from '../workhorse';
export default class Work {
    id: string;
    workLoadHref: string;
    input: any;
    result: WorkResult;
    finalizerResult: WorkResult;
    parentID: string;
    childrenIDs: string[];
    finishedChildrenIDs: string[];
    runnable: Runnable;
    constructor(workLoadHref?: string, input?: any);
    deep(workhorse: Workhorse): Promise<any>;
}
