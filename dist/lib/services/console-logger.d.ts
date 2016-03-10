import Logger from '../interfaces/logger';
import LogLevel from '../models/log-level';
import Workhorse from '../workhorse';
import Work from '../models/work';
export default class ConsoleLogger implements Logger {
    workhorse: Workhorse;
    level: LogLevel;
    log(message: string, level?: LogLevel | Error): void;
    logInsideWork(work: Work, message: string, level?: LogLevel | Error): void;
    logOutsideWork(work: Work, message: string, level?: LogLevel | Error): void;
    workEnded(): Promise<any>;
    flush(): Promise<any>;
    static parseLevel(level?: LogLevel | Error): any[];
    static formatMessage(message: string, level?: LogLevel | Error): string;
}
