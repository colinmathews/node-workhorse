import { Response, Work } from '../../index';
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
      return this.createChildWork(work);
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

  onChildrenDone(_work: Work): Promise<any> {
    return Promise.resolve();
  }

  protected getParentName (work: Work): Promise<string> {
    return this.workhorse.state.load(work.parentID)
    .then((parent) => {
      if (!parent) {
        return null;
      }
      return parent.input.name;
    });
  }

  protected createChildWork(work: Work): Work[] {
    let count = work.input.kids;
    let list = [];
    for (let i = 0; i < count; i++) {
      list.push(new Work(`${this.baseWorkPath}grand-child`, {
        index: i,
        name: `Grandchild ${i + 1}`
      }));
    }
    return list;
  }
}
