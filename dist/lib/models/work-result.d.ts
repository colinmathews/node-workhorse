export default class WorkResult {
    result: any;
    error: Error;
    started: Date;
    ended: Date;
    start(): void;
    end(err?: Error, result?: any): void;
}
