import { Promise } from 'es6-promise';
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';

interface Logger {
  workhorse: Workhorse;
  level: LogLevel;
  log: (message: string, level?: LogLevel|Error) => void;
  logInsideWork: (work: Work, message: string, level?: LogLevel | Error) => void;
  logOutsideWork: (work: Work, message: string, level?: LogLevel | Error) => void;
  workEnded: (work: Work) => void;
  flush: () => Promise<any>;
}

export default Logger
