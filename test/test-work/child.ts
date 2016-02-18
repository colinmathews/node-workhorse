import { Promise } from 'es6-promise';
import { Runnable, Workhorse, Response, Work } from '../../index';
import Parent from './parent';

export default class Child extends Parent {
  run (work: Work): Promise<Response> {
    let parentName;

    return this.getParentName(work)
    .then((result) => {
      parentName = result;
      return this.randomWait();
    })
    .then(() => {
      return this.createChildWork();
    })
    .then((children: Work[]) => {
      return {
        result: {
          parentName: parentName,
          name: work.input.name
        },
        childWork: children
      };
    });
  }

  protected getParentName (work: Work): Promise<string> {
    return this.driver.state.load(work.parentID)
    .then((parent) => {
      if (!parent) {
        return null;
      }
      return parent.input.name;
    });
  }

  protected createChildWork() {
    let count = 1 + Math.round(Math.random() * 3);
    let list = [];
    for (let i = 0; i < count; i++) {
      list.push(new Work('grand-child', {
        name: `Grandchild ${i + 1}`
      }));
    }
    return list;
  }

  onChildrenDone (work: Work): Promise<any> {
    return Promise.resolve();
  }
}
