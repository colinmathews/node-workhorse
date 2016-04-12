import { Promise } from 'es6-promise';
import Route from '../models/route';
import Work from '../models/work';
import IRouter from '../interfaces/router';
import Workhorse from '../workhorse';

export default class MemoryRouter implements IRouter {
  workhorse: Workhorse;

  route (options: Route): Promise<any> {
    return this.workhorse.state.load(options.workID)
    .then((work: Work) => {
      return this.workhorse.run(work);
    })
    .then(() => {
      return null;
    });
  }

  routeFinalizer (options: Route): Promise<any> {
    return this.workhorse.state.load(options.workID)
    .then((work: Work) => {
      return this.workhorse.runFinalizer(work);
    })
    .then(() => {
      return null;
    });
  }
}
