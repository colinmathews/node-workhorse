import Route from '../models/route';
import Router from '../interfaces/router';
import Workhorse from '../workhorse';
export default class MemoryRouter implements Router {
    workhorse: Workhorse;
    route(options: Route): Promise<any>;
    routeFinalizer(options: Route): Promise<any>;
}
