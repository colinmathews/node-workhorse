import { Promise } from 'es6-promise';
import { Runnable, Workhorse, Response, Work } from '../../index';

export default class Calculator implements Runnable {
  errors: Error[] = [];
  workhorse: Workhorse;

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

  private createChildWork(input: any) {
    return [new Work('calculator', {
      x: input.x,
      y: input.y
    })];
  }

  onChildrenDone (work: Work): Promise<any> {
    return Promise.resolve();
  }
}
