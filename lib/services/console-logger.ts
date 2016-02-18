import { Promise } from 'es6-promise';
import Logger from '../interfaces/logger'
import LogLevel from '../models/log-level';
import Driver from '../driver';
import Work from '../models/work';

export default class ConsoleLogger implements Logger {
  driver: Driver;
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
    return this.log(`${message}: ${work.filePath}:${work.id}`, level);
  }

  flush (): Promise<any> {
    return Promise.resolve();
  }
}
