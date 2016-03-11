import { Response, Work } from '../../index';
import Child from './child';
export default class GrandChild extends Child {
    run(work: Work): Promise<Response>;
}
