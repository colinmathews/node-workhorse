import { Promise } from 'es6-promise';
import { Work } from '../../index';
import Workhorse from '../workhorse';

interface IStateManager {
  workhorse: Workhorse;
  save: (work: Work) => Promise<any>;
  saveAll: (work: Work[]) => Promise<any>;
  saveWorkStarted: (work: Work) => Promise<any>;
  saveWorkEnded: (work: Work) => Promise<any>;
  saveFinalizerStarted: (work: Work) => Promise<any>;
  saveFinalizerEnded: (work: Work) => Promise<any>;
  saveCreatedChildren: (work: Work) => Promise<any>;
  load: (id: string) => Promise<Work>;
  loadAll: (ids: string[]) => Promise<Work[]>;
  childWorkFinished: (work: Work, parent: Work) => Promise<boolean>;
}

export default IStateManager;
