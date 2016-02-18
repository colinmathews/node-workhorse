import { Promise } from 'es6-promise';
import Response from '../models/response';
import Work from '../models/work';
import Workhorse from '../workhorse';

interface Runnable {
  workhorse: Workhorse;
  run: (work: Work) => Promise<Response>;
  onChildrenDone?: (work: Work) => Promise<any>;
}

export default Runnable
