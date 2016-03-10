import { Promise } from 'es6-promise';
import Logger from '../interfaces/logger'
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';

export default class ConsoleLogger implements Logger {
  workhorse: Workhorse;
  level: LogLevel;

  log(message: string, level?: LogLevel|Error) {
    let [formattedMessage, parsedLevel] = ConsoleLogger.formatMessage(message, level);

    // Ignore
    if (this.level && this.level < parsedLevel) {
      return;
    }

    switch (parsedLevel) {
      case LogLevel.Debug:
      case LogLevel.Info:
      case LogLevel.Warn:
        console.log(formattedMessage);
        break;
      case LogLevel.Error:
        console.error(formattedMessage);
        break;
      default:
        throw new Error(`Unsupported log level: ${parsedLevel}`);
    }
  }

  logInsideWork(work: Work, message: string, level?: LogLevel|Error) {
    return this.log(`${message}: ${work.workLoadHref}:${work.id}`, level);
  }

  logOutsideWork(work: Work, message: string, level?: LogLevel|Error) {
    return this.log(`${message}: ${work.workLoadHref}:${work.id}`, level);
  }

  workEnded(): Promise<any> {
    return Promise.resolve();
  }

  flush(): Promise<any> {
    return Promise.resolve();
  }

  static parseLevel(level?: LogLevel|Error): [LogLevel, Error] {
    let err;
    if (level instanceof Error) {
      err = <Error>level;
      level = LogLevel.Error;
    }
    if (!level) {
      level = LogLevel.Info;
    }
    return [<LogLevel>level, err];
  }

  static formatError(error:Error): string {
    return error.stack;
  }

  static formatMessage(message: string, level?: LogLevel|Error): [string, LogLevel] {
    let [parsedLevel, err] = ConsoleLogger.parseLevel(level);
    let formattedMessage = message;
    if (err) {
      formattedMessage += `: ${ConsoleLogger.formatError(err)}`;
    }

    switch (parsedLevel) {
      case LogLevel.Debug:
      case LogLevel.Info:
        break;
      case LogLevel.Warn:
        formattedMessage = `WARN: ${formattedMessage}`
        break;
      case LogLevel.Error:
        formattedMessage = `ERROR: ${formattedMessage}`;
        break;
      default:
        throw new Error(`Unsupported log level: ${parsedLevel}`);
    }

    return [formattedMessage, parsedLevel];
  }
}
