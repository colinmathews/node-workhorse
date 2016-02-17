import { Work } from '../../index';

interface StateManager {
  save: (work: Work) => Promise<void>;
  saveAll: (work: Work[]) => Promise<void>;
  load: (id: string) => Promise<Work>;
}

export default StateManager
