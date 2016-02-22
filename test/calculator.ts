require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import { Workhorse, Config, Work, LogLevel } from '../index';

describe('Calculator', () => {
  let subject : Workhorse;
  let baseWorkPath = `${__dirname}/test-work/`;

  beforeEach(function () {
    subject = new Workhorse();
    subject.logger.level = LogLevel.None;
  });

  describe('#run', () => {
    it('should add two numbers', () => {
      return subject.run(`${baseWorkPath}calculator`, { x: 1, y: 2 })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        assert.equal(work.result.result, 3);
      });
    });

    it('should spawn child work', () => {
      return subject.run(`${baseWorkPath}calculator`, { x: 1, y: 2, twice: true })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        assert.equal(work.result.result, 3);
      });
    });

    it('should fail if numbers not used', () => {
      return subject.run(`${baseWorkPath}calculator`, { x: 'error', y: 2 })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        assert.isNull(work.result.result);
        assert.isNotNull(work.result.error);
        assert.typeOf(work.result.error, 'error');
      });
    });
  });
});
