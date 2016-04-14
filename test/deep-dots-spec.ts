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
});
