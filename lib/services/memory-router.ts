import Route from '../models/route';
import Work from '../models/work';
import Router from '../interfaces/router';
import StateManager from '../interfaces/state-manager';
import Driver from '../driver';

export default class MemoryRouter implements Router {
  route (options: Route, driver: Driver): Promise<void> {
    let state = <StateManager>driver.config.stateManager;
    return state.load(options.workID)
    .then((work: Work) => {
      return driver.run(work);
    })
    .then(() => {
      return null;
    });
  }
}
