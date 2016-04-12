import { Promise } from 'es6-promise';
import Route from '../models/route';
import Workhorse from '../workhorse';

interface IRouter {
  workhorse: Workhorse;
  route: (options: Route) => Promise<any>;
  routeFinalizer: (options: Route) => Promise<any>;
}

export default IRouter
