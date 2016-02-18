import { Promise } from 'es6-promise';
import Runnable from './runnable';
import Driver from '../driver';

interface WorkLoader {
  driver: Driver;
  loadAllWork: (path: string) => Promise<any>;
  getWork: (path: string) => Promise<Runnable>;
}

export default WorkLoader
