import { Runnable, Workhorse, Response, Work } from '../../index';
export default class Calculator implements Runnable {
    errors: Error[];
    workhorse: Workhorse;
    baseWorkPath: string;
    run(work: Work): Promise<Response>;
    private createChildWork(input);
    onChildrenDone(work: Work): Promise<any>;
}
