import { Promise } from 'es6-promise';
import { Work } from '../../index';

interface StateManager {
  save: (work: Work) => Promise<any>;
  saveAll: (work: Work[]) => Promise<any>;
  load: (id: string) => Promise<Work>;
}

export default StateManager
