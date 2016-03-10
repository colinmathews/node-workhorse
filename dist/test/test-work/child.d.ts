import { Response, Work } from '../../index';
import Parent from './parent';
export default class Child extends Parent {
    run(work: Work): Promise<Response>;
    protected getParentName(work: Work): Promise<string>;
    protected createChildWork(work: Work): any[];
    onChildrenDone(work: Work): Promise<any>;
}
