import { Runnable, Workhorse, Response, Work } from '../../index';
export default class Parent implements Runnable {
    workhorse: Workhorse;
    baseWorkPath: string;
    run(work: Work): Promise<Response>;
    protected randomWait(): Promise<any>;
    protected createChildWork(work: Work): Work[];
    onChildrenDone(work: Work): Promise<any>;
}
