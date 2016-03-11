import Work from './work';
export default class Response {
    result: any;
    childWork: Work[];
    constructor(result: any, childWork: Work[]);
}
