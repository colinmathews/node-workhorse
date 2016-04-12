export default class Route {
  public workID: string;

  constructor(props: any = {}) {
    Object.keys(props).forEach((key: string) => {
      this[key] = props[key];
    });
  }
}
