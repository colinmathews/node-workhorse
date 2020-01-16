import { Response, Work } from '../../index';
import Child from './child';

export default class GrandChild extends Child {
  run (work: Work): Promise<Response> {
    let parentName;
    let grandParentName;

    return this.getParentName(work)
    .then((result) => {
      parentName = result;
      return this.workhorse.state.load(work.parentID);
    })
    .then((parent) => {
      return this.getParentName(parent);
    })
    .then((result) => {
      grandParentName = result;
      return this.randomWait();
    })
    .then(() => {
      return {
        result: {
          grandParentName: grandParentName,
          parentName: parentName,
          name: work.input.name
        },
        childWork: []
      };
    });
  }
}
