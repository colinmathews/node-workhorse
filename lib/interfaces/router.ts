import { Promise } from 'es6-promise';
import Route from '../models/route';
import Workhorse from '../workhorse';

interface Router {
  workhorse: Workhorse;
  route: (options: Route) => Promise<any>;
}

export default Router
