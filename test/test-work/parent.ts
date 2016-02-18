import { Promise } from 'es6-promise';
import { Runnable, Workhorse, Response, Work } from '../../index';

export default class Parent implements Runnable {
  driver: Workhorse;

  run (work: Work): Promise<Response> {
    return this.randomWait()
    .then(() => {
      return this.createChildWork();
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

  protected createChildWork(): Work[] {
    let count = 1 + Math.round(Math.random() * 3);
    let list = [];
    for (let i = 0; i < count; i++) {
      list.push(new Work('child', {
        name: `Child ${i + 1}`
      }));
    }
    return list;
  }

  onChildrenDone (work: Work): Promise<any> {
    return Promise.resolve();
  }
}
