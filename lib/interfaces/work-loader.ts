import Runnable from './runnable';

interface WorkLoader {
  loadAllWork: (path: string) => Promise<void>;
  getWork: (path: string) => Promise<Runnable>;
}

export default WorkLoader
