export default class WorkResult {
  public result: any;
  public error: Error;
  public started: Date;
  public ended: Date;

  start(): void {
    this.result = this.error = this.ended = null;
    this.started = new Date();
  }

  end(err?: Error, result?: any): void {
    if (err) {
      this.error = err;
    }
    if (result) {
      this.result = result;
    }
    this.ended = new Date();
  }
}
