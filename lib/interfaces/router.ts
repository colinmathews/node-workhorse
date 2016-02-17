import Route from '../models/route';
import Driver from '../driver';

interface Router {
  route: (options: Route, driver: Driver) => Promise<void>;
}

export default Router
