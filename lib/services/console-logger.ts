import { Promise } from 'es6-promise';
import Logger from '../interfaces/logger'
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';

export default class ConsoleLogger implements Logger {
  workhorse: Workhorse;
  level: LogLevel;

  log (message: string, level?: LogLevel|Error) {
    let formattedMessage = message;
    let err;
    if (level instanceof Error) {
      err = <Error>level;
      formattedMessage += `: ${err.message}`;
      level = LogLevel.Error;
    }
    if (!level) {
      level = LogLevel.Info;
    }

    // Ignore
    if (this.level && this.level < level) {
      return;
    }

    switch(level) {
      case LogLevel.Debug:
        // Ignore
        break;
      case LogLevel.Info:
        console.log(formattedMessage);
        break;
      case LogLevel.Warn:
        console.log(`WARN: ${formattedMessage}`);
        break;
      case LogLevel.Error:
        console.error(formattedMessage);
        break;
      default:
        throw new Error(`Unsupported log level: ${level}`);
    }
  }

  logForWork (work: Work, message: string, level?: LogLevel|Error) {
    return this.log(`${message}: ${work.workLoadHref}:${work.id}`, level);
  }

  flush (): Promise<any> {
    return Promise.resolve();
  }
}
