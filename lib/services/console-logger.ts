import { Promise } from 'es6-promise';
import Logger from '../interfaces/logger'
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';

export default class ConsoleLogger implements Logger {
  workhorse: Workhorse;
  level: LogLevel;

  log (message: string, level?: LogLevel|Error) {
    let err;
    [level, err] = ConsoleLogger.parseLevel(level);
    let formattedMessage = ConsoleLogger.formatMessage(message, level);

    // Ignore
    if (this.level && this.level < level) {
      return;
    }

    switch(level) {
      case LogLevel.Debug:
      case LogLevel.Info:
      case LogLevel.Warn:
        console.log(formattedMessage);
        break;
      case LogLevel.Error:
        console.error(formattedMessage);
        break;
      default:
        throw new Error(`Unsupported log level: ${level}`);
    }
  }

  logInsideWork (work: Work, message: string, level?: LogLevel|Error) {
    return this.log(`${message}: ${work.workLoadHref}:${work.id}`, level);
  }

  logOutsideWork (work: Work, message: string, level?: LogLevel|Error) {
    return this.log(`${message}: ${work.workLoadHref}:${work.id}`, level);
  }

  workEnded () {
  }

  flush (): Promise<any> {
    return Promise.resolve();
  }

  static parseLevel(level?: LogLevel|Error) {
    let err;
    if (level instanceof Error) {
      err = <Error>level;
      level = LogLevel.Error;
    }
    if (!level) {
      level = LogLevel.Info;
    }
    return [level, err];
  }

  static formatMessage(message: string, level?: LogLevel|Error) {
    let err;
    [level, err] = ConsoleLogger.parseLevel(level);
    let formattedMessage = message;
    if (err) {
      formattedMessage += `: ${err.message}`;
    }

    switch(level) {
      case LogLevel.Debug:
      case LogLevel.Info:
        return formattedMessage;
      case LogLevel.Warn:
        return `WARN: ${formattedMessage}`
      case LogLevel.Error:
        return `ERROR: ${formattedMessage}`;
      default:
        throw new Error(`Unsupported log level: ${level}`);
    }
  }
}
