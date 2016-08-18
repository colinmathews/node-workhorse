import IRunnable from '../interfaces/runnable';
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
    ancestorLevel: number;
    created: Date;
    updated: Date;
    runnable: IRunnable;
    constructor(workLoadHref?: string, input?: any);
    deep(workhorse: Workhorse, levelsDeep?: number): Promise<any>;
    copy(): Work;
}
