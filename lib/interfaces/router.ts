import { Promise } from 'es6-promise';
import Route from '../models/route';
import Driver from '../driver';

interface Router {
  route: (options: Route, driver: Driver) => Promise<any>;
}

export default Router
