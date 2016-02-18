import { Promise } from 'es6-promise';
import Route from '../models/route';
import Driver from '../driver';

interface Router {
  driver: Driver;
  route: (options: Route) => Promise<any>;
}

export default Router
