import { IRunnable, Workhorse, Response, Work } from '../../index';
export default class Parent implements IRunnable {
    workhorse: Workhorse;
    baseWorkPath: string;
    run(work: Work): Promise<Response>;
    onChildrenDone(_work: Work): Promise<any>;
    protected randomWait(): Promise<any>;
    protected createChildWork(work: Work): Work[];
}
