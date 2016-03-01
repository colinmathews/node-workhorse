require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import { Workhorse, Config, Work, LogLevel } from '../index';

describe('Family Tree', () => {
  let subject : Workhorse;
  let baseWorkPath = `${__dirname}/test-work/`;

  beforeEach(function () {
    subject = new Workhorse();
    subject.logger.level = LogLevel.None;
  });

  describe('#run', () => {
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
      return subject.run(`${baseWorkPath}parent`, { name: 'Colin', kids: 3, grandKids: 2 })
      .then((work: Work) => {
        assert.isNotNull(work.result);
        return work.deep(subject);
      })
      .then((pretty) => {
        assert.lengthOf(pretty.children, 3);
        sortKidsByIndex(pretty.children);
        assert.lengthOf(pretty.children[0].children, 2);
        assert.lengthOf(pretty.children[1].children, 2);
        assert.isTrue(new Date(pretty.finalizerResult.started) >=
          lastEndDate(pretty.children), 'The parent finalizer should have started after everyone else finished.');
      });
    });
  });
});
