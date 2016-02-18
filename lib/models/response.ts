import Work from './work';

export default class Response {
  constructor(public result:any, public childWork: Work[]) {
  }
}
