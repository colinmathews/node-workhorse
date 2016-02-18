export default class WorkResult {
  result: any;
  error: Error;
  started: Date;
  ended: Date;

  start() {
    this.result = this.error = this.ended = null;
    this.started = new Date();
  }

  end(err?: Error, result?: any) {
    if (err) {
      this.error = err;
    }
    if (result) {
      this.result = result;
    }
    this.ended = new Date();
  }
}
