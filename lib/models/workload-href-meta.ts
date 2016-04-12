import url = require('url');
import path = require('path');

export default class WorkloadHrefMeta {
  constructor(public modulePath: string, public className: string) {}

  static parse(href: string): WorkloadHrefMeta {
    let meta = url.parse(href);
    if (meta.protocol === 'working:') {
      return this.parseWorking(meta);
    }
    return this.parseSimplePath(href);
  }

  private static parseWorking(meta: any): WorkloadHrefMeta {
    let filePath = path.join(meta.host, meta.path);
    let resolvedPath = path.resolve(filePath);
    return this.parseSimplePath(resolvedPath);
  }

  private static parseSimplePath(href: string): WorkloadHrefMeta {
    let [modulePath, className] = href.split(':');
    if (!modulePath) {
      modulePath = path.resolve(__dirname, '../../index');
    }
    return new WorkloadHrefMeta(modulePath, className);
  }
}
