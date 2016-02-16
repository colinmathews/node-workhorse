import WorkLoader from '../interfaces/work-loader'
import Runnable from '../interfaces/runnable';

export default class FileWorkLoader implements WorkLoader {
  private rootWorkPath: string;

  loadAllWork (path: string): Promise<void> {
    return new Promise<void>((ok, fail) => {
      this.rootWorkPath = path;
      ok();
    });
  }

  getWork (filePath: string): Promise<Runnable> {
    return new Promise((ok, fail) => {
      if (!this.rootWorkPath) {
        throw new Error('loadAllWork has not been called');
      }
      let codePath = `${this.rootWorkPath}/${filePath}`;
      let code = require(codePath);
      ok(new code.default());
    });
  }
}
