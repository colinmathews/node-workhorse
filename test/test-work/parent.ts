import { Promise } from 'es6-promise';
import { IRunnable, Workhorse, Response, Work } from '../../index';

export default class Parent implements IRunnable {
  workhorse: Workhorse;
  baseWorkPath: string = `${__dirname}/`;

  run (work: Work): Promise<Response> {
    return this.randomWait()
    .then(() => {
      return this.createChildWork(work);
    })
    .then((children: Work[]) => {
      return {
        result: {
          name: work.input.name
        },
        childWork: children
      }
    });
  }

  protected randomWait(): Promise<any> {
    return new Promise((ok, fail) => {
      let millis = Math.random() * 100;
      setTimeout(() => {
        ok();
      }, millis);
    });
  }

  protected createChildWork(work: Work): Work[] {
    let count = work.input.kids;
    let list = [];
    for (let i = 0; i < count; i++) {
      list.push(new Work(`${this.baseWorkPath}child`, {
        index: i,
        name: `Child ${i + 1}`,
        kids: work.input.grandKids
      }));
    }
    return list;
  }

  onChildrenDone (work: Work): Promise<any> {
    return Promise.resolve();
  }
}
