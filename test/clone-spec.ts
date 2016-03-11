require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import Work from '../lib/models/Work';
import clone from '../lib/util/clone';
import { cloneInto } from '../lib/util/clone';

describe('Clone', () => {
  it('should duplicate an object without sharing references', () => {
    let source = {
      a: 'hi',
      b: [1, 2],
      c: new Object()
    };
    let dest = clone(source);
    assert.equal(dest.a, source.a);
    assert.notEqual(dest.b, source.b);
    assert.lengthOf(dest.b, source.b.length);
    assert.equal(dest.b[0], source.b[0]);
    assert.notEqual(dest.c, source.c);
  });

  it('should clone into a specific class type', () => {
    let source = new Work('testing', {
      a: 'hi',
      b: [1, 2],
      c: new Object()
    });
    let dest = new Work();
    cloneInto(source, dest);
    assert.notEqual(dest.input, source.input);
    assert.equal(dest.input.a, source.input.a);
    assert.notEqual(dest.input.b, source.input.b);
    assert.lengthOf(dest.input.b, source.input.b.length);
    assert.equal(dest.input.b[0], source.input.b[0]);
    assert.notEqual(dest.input.c, source.input.c);
  });
});
