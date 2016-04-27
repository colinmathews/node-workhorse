require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import deepDots from '../lib/util/deep-dots';

describe('Deep dots', () => {
  it('should reach into nested properties', () => {
    let source = {
      ports: {
        common: 1,
        accounts: 2
      }
    };
    let dest = deepDots(source, 'ports.common');
    assert.equal(dest, 1);
  });

  it('should get a first-level path', () => {
    let source = {
      a: 'cracker',
      ports: {
        common: 1,
        accounts: 2
      }
    };
    let dest = deepDots(source, 'a');
    assert.equal(dest, 'cracker');
  });

  it('should return nothing when any part of path does not exist', () => {
    let source = {
      a: 'cracker',
      deep1: {
        deep2: {
          value3: 'blah'
        },
        accounts: 2
      }
    };
    let dest = deepDots(source, 'deep1.thisdoesnotexist.value3');
    assert.isNull(dest);
  });
});
