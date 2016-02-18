import { Promise } from 'es6-promise';
import Runnable from './runnable';
import Workhorse from '../workhorse';

interface WorkLoader {
  workhorse: Workhorse;
  loadAllWork: (path: string) => Promise<any>;
  getWork: (path: string) => Promise<Runnable>;
}

export default WorkLoader
