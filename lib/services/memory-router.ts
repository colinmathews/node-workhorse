import { Promise } from 'es6-promise';
import Route from '../models/route';
import Work from '../models/work';
import Router from '../interfaces/router';
import StateManager from '../interfaces/state-manager';
import Driver from '../driver';

export default class MemoryRouter implements Router {
  driver: Driver;

  route (options: Route): Promise<any> {
    return this.driver.state.load(options.workID)
    .then((work: Work) => {
      return this.driver.run(work);
    })
    .then(() => {
      return null;
    });
  }
}
