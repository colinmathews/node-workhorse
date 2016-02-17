import Response from '../models/response';
import Work from '../models/work';
import Driver from '../driver';

interface Runnable {
  run: (input: any, driver: Driver) => Promise<Response>;
  onChildrenDone?: (work: Work, driver: Driver) => Promise<any>;
}

export default Runnable
