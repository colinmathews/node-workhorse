import '../index';
import { assert } from 'chai';
import { Workhorse, Config, Work, LogLevel } from '../index';

describe('Sample', () => {
  let subject : Workhorse;

  beforeEach(function () {
    subject = new Workhorse(new Config({
      workFilePath: `${__dirname}/test-work`
    }));
    subject.logger.level = LogLevel.None;
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
    let sortKidsByIndex = (children) => {
      children.sort((a, b) => {
        if (a.index === b.index) {
          return 0;
        }
        return a.index < b.index ? -1 : 1;
      });
    };

    let lastEndDate = (list) => {
      return list.reduce((max, row) => {
        let childMax = lastEndDate(row.children);
        let date = new Date(row.result.ended);
        if (childMax && childMax > date) {
          date = childMax;
        }

        if (!max || max < date) {
          return date;
        }
        return max;
      }, null);
    };

    it('should run deeply', () => {
      return subject.run('parent', { name: 'Colin', kids: 3, grandKids: 2 })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        return work.prettyPrint(subject);
      })
      .then((pretty) => {
        assert.lengthOf(pretty.children, 3);
        sortKidsByIndex(pretty.children);
        assert.lengthOf(pretty.children[0].children, 2);
        assert.lengthOf(pretty.children[1].children, 2);
        assert.isTrue(new Date(pretty.finalizerResult.started) > 
          lastEndDate(pretty.children), 'The parent finalizer should have started after everyone else finished.');
      });
    });
  });
});
