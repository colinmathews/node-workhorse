import { Promise } from 'es6-promise';
import { Runnable, Workhorse, Response, Work } from '../../index';

export default class Calculator implements Runnable {
  errors: Error[] = [];
  run (work: Work, driver: Workhorse): Promise<Response> {
    return new Promise((ok, fail) => {
      let input = work.input;
      if (typeof(input.x) !== 'number' || typeof(input.y) !== 'number') {
        return fail(new Error('Inputs must be numbers'));
      }
      let children;
      if (input.twice) {
        children = this.createChildWork(input, driver);
      }
      ok({
        result: input.x + input.y,
        childWork: children
      });
    });
  }

  private createChildWork(input: any, driver: Workhorse) {
    return [new Work('calculator', {
      x: input.x,
      y: input.y
    })];
  }

  onChildrenDone (work: Work, driver: Workhorse): Promise<any> {
    return Promise.resolve();
  }
}
