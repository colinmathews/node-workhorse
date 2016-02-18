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
        assert.isNotNull(work.result);
        assert.equal(work.result.result, 3);
      });
    });

    it('should spawn child work', () => {
      return subject.run('calculator', { x: 1, y: 2, twice: true })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        assert.equal(work.result.result, 3);
      });
    });

    it('should fail if numbers not used', () => {
      return subject.run('calculator', { x: 'error', y: 2 })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        assert.isNull(work.result.result);
        assert.isNotNull(work.result.error);
        assert.typeOf(work.result.error, 'error');
      });
    });
  });

  describe('#family-tree', () => {
    it('should run deeply', () => {
      return subject.run('parent', { name: 'Colin' })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        return work.prettyPrint(subject);
      })
      .then((pretty) => {
        console.log('todo: ' + JSON.stringify(pretty, null, 2));
      });
    });
  });
});