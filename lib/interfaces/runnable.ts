import { Promise } from 'es6-promise';
import Response from '../models/response';
import Work from '../models/work';
import Driver from '../driver';

interface Runnable {
  driver: Driver;
  run: (work: Work) => Promise<Response>;
  onChildrenDone?: (work: Work) => Promise<any>;
}

export default Runnable
