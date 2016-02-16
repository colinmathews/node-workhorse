import Runnable from '../interfaces/runnable';

export default class Work {
  id: string;
  filePath: string;
  input: any;
  result: any;
  error: Error;
  started: Date;
  ended: Date;

  runnable: Runnable;
  parent: Work;
  children: Work[];

  constructor(props: any = {}) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });
  }

  run() {
    // return this.work()
    // .then((result: any) => {
    //   this.result = result;
    // })
    // .catch((err: Error) => {
    //   this.error = err;
    // });
  }
}
