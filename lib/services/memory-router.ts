import { Promise } from 'es6-promise';
import Route from '../models/route';
import Work from '../models/work';
import Router from '../interfaces/router';
import StateManager from '../interfaces/state-manager';
import Workhorse from '../workhorse';

export default class MemoryRouter implements Router {
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
}
