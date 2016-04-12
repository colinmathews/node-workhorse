import ILogger from '../interfaces/logger';
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';
export default class ConsoleLogger implements ILogger {
    workhorse: Workhorse;
    level: LogLevel;
    static parseLevel(level?: LogLevel | Error): [LogLevel, Error];
    static formatError(error: Error): string;
    static formatMessage(message: string, level?: LogLevel | Error): [string, LogLevel];
    log(message: string, level?: LogLevel | Error): void;
    logInsideWork(work: Work, message: string, level?: LogLevel | Error): void;
    logOutsideWork(work: Work, message: string, level?: LogLevel | Error): void;
    workEnded(): Promise<any>;
    finalizerRan(): Promise<any>;
    flush(): Promise<any>;
}
