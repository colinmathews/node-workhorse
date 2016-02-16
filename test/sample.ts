import '../index';
import { assert } from 'chai';
import { Workhorse, Config, Work } from '../index';

describe('Sample', () => {
  var subject : Workhorse;

  beforeEach(function () {
    subject = new Workhorse(new Config({
      workFilePath: `${__dirname}/test-work`
    }));
  });
  describe('#calculator', () => {
    it('should add two numbers', () => {
      return subject.run('calculator', { x: 1, y: 2 })
      .then((work: Work) => {
        assert.equal(work.result, 3);
      });
    });

    it('should fail if numbers not used', () => {
      return subject.run('calculator', { x: 'error', y: 2 })
      .then((work: Work) => {
        assert.isNull(work.result);
        assert.isNotNull(work.error);
        assert.typeOf(work.error, 'error');
      });
    });
  });
});