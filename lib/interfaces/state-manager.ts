import { Promise } from 'es6-promise';
import { Work } from '../../index';
import Driver from '../driver';

interface StateManager {
  driver: Driver;
  save: (work: Work) => Promise<any>;
  saveAll: (work: Work[]) => Promise<any>;
  load: (id: string) => Promise<Work>;
  loadAll: (ids: string[]) => Promise<Work[]>;
}

export default StateManager
