import { Response, Work } from '../../index';
import Parent from './parent';
export default class Child extends Parent {
    run(work: Work): Promise<Response>;
    onChildrenDone(work: Work): Promise<any>;
    protected getParentName(work: Work): Promise<string>;
    protected createChildWork(work: Work): Work[];
}
