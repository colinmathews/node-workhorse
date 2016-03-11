import Route from '../models/route';
import Workhorse from '../workhorse';
interface Router {
    workhorse: Workhorse;
    route: (options: Route) => Promise<any>;
    routeFinalizer: (options: Route) => Promise<any>;
}
export default Router;
