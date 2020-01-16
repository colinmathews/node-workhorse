import { IRunnable, Workhorse, Response, Work } from '../../index';

export default class Calculator implements IRunnable {
  errors: Error[] = [];
  workhorse: Workhorse;
  baseWorkPath: string = `${__dirname}/`;

  run (work: Work): Promise<Response> {
    return new Promise((ok, fail) => {
      let input = work.input;
      if (typeof(input.x) !== 'number' || typeof(input.y) !== 'number') {
        return fail(new Error('Inputs must be numbers'));
      }
      let children;
      if (input.twice) {
        children = this.createChildWork(input);
      }
      ok({
        result: input.x + input.y,
        childWork: children
      });
    });
  }

  onChildrenDone (_work: Work): Promise<any> {
    return Promise.resolve();
  }

  private createChildWork(input: any): Work[] {
    return [new Work(`${this.baseWorkPath}calculator`, {
      x: input.x,
      y: input.y
    })];
  }
}
