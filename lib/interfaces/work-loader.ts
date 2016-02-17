import { Promise } from 'es6-promise';
import Runnable from './runnable';

interface WorkLoader {
  loadAllWork: (path: string) => Promise<any>;
  getWork: (path: string) => Promise<Runnable>;
}

export default WorkLoader
