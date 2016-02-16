import { Runnable } from '../../index';

export default class Calculator implements Runnable {
  errors: Error[] = [];
  run (input: any): Promise<any> {
    if (typeof(input.x) !== 'number' || typeof(input.y) !== 'number') {
      return Promise.reject(new Error('Inputs must be numbers'));
    }
    return Promise.resolve(input.x + input.y);
  }

  catch (err: Error): Promise<any> {
    this.errors.push(err);
    return Promise.resolve();
  }
}
