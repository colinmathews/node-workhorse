require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import path = require('path');
import WorkloadHrefMeta from '../lib/models/workload-href-meta';

describe('WorkloadHrefMeta', () => {
  it('should parse working protocol', () => {
    let result = WorkloadHrefMeta.parse('working://module-name/lives/here:class-name');
    assert.isNotNull(result);
    assert.equal(result.modulePath, path.resolve('module-name/lives/here'));
    assert.equal(result.className, 'class-name');
  });

  it('should parse a npm installed module', () => {
    let result = WorkloadHrefMeta.parse('some-package:className');
    assert.isNotNull(result);
    assert.equal(result.modulePath, 'some-package');
    assert.equal(result.className, 'className');
  });

  it('should parse a node-workhorse module', () => {
    let result = WorkloadHrefMeta.parse(':ConsoleLogger');
    assert.isNotNull(result);
    assert.equal(result.modulePath, path.resolve(__dirname, '../../dist/index'));
    assert.equal(result.className, 'ConsoleLogger');
  });
});
