import { Promise } from 'es6-promise';
import LogLevel from '../models/log-level';
import Driver from '../driver';
import Work from '../models/work';

interface Logger {
  driver: Driver;
  level: LogLevel;
  log: (message: string, level?: LogLevel|Error) => void;
  logForWork: (work: Work, message: string, level?: LogLevel|Error) => void;
  flush: () => Promise<any>;
}

export default Logger
