import Runnable from './lib/interfaces/runnable';
import Logger from './lib/interfaces/logger';
import Router from './lib/interfaces/router';
import StateManager from './lib/interfaces/state-manager';
import WorkLoader from './lib/interfaces/work-loader';

import Config from './lib/models/config';
import LogLevel from './lib/models/log-level';
import Response from './lib/models/response';
import Route from './lib/models/route';
import WorkResult from './lib/models/work-result';
import Work from './lib/models/work';

import ConsoleLogger from './lib/services/console-logger';
import FileWorkLoader from './lib/services/file-work-loader';
import MemoryRouter from './lib/services/memory-router';
import MemoryStateManager from './lib/services/memory-state-manager';

import Workhorse from './lib/workhorse';

// TODO: Figure out why if we don't 
// export a class with access to the import statements,
// the .d.ts file will not bring over the import statements.
export class shim {
  a: Runnable;
  b: Logger;
  c: Router;
  d: StateManager;
  e: WorkLoader;
  f: Config;
  g: LogLevel;
  h: Response;
  i: Route;
  j: WorkResult;
  k: Work;
  l: ConsoleLogger;
  m: FileWorkLoader;
  n: MemoryRouter;
  o: MemoryStateManager;
  p: Workhorse;
}

export {
  Runnable,
  Logger,
  Router,
  StateManager,
  WorkLoader,
  Config,
  LogLevel,
  Response,
  Route,
  WorkResult,
  Work,
  ConsoleLogger,
  FileWorkLoader,
  MemoryRouter,
  MemoryStateManager,
  Workhorse
}
