import Route from '../models/route';
import IRouter from '../interfaces/router';
import Workhorse from '../workhorse';
export default class MemoryRouter implements IRouter {
    workhorse: Workhorse;
    route(options: Route): Promise<any>;
    routeFinalizer(options: Route): Promise<any>;
}
