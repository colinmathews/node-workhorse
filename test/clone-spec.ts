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

  it('should clone error objects', () => {
    let source = new Error('Hi');
    let dest = clone(source);
    assert.notEqual(dest, source);
    assert.equal(dest.message, source.message);
    assert.equal(dest.stack, source.stack);
  });

  it('should clone dates', () => {
    let source = { x: new Date() };
    let dest = clone(source);
    assert.notEqual(dest, source);
    assert.instanceOf(dest.x, Date);
    assert.notEqual(dest.x, source.x);
    assert.equal(dest.x.valueOf(), source.x.valueOf());
  });

  it('should clone regular expressions', () => {
    let source = { x: /blah/i };
    let dest = clone(source);
    assert.notEqual(dest, source);
    assert.instanceOf(dest.x, RegExp);
    assert.notEqual(dest.x, source.x);
    assert.isTrue(dest.x.test('Blah'));
  });

  it('should deep clone', () => {
    let source = {
      one: [1, {
        two: [{
          date: new Date()
        }]
      }],
      three: {
        reg: /hi/
      },
      four: true
    };
    let dest = clone(source);
    assert.notEqual(dest, source);
    assert.lengthOf(dest.one, source.one.length);
    assert.instanceOf(dest.one[1].two[0].date, Date);
    assert.instanceOf(dest.three.reg, RegExp);
    assert.isTrue(dest.four === true);
  });

  it('should prevent cloning of circlular references', () => {
    let source = {
      a: []
    };
    source.a.push(source);
    let fn = () => clone(source);
    assert.throws(fn);
  });
});
