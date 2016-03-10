require('source-map-support').install({
  handleUncaughtExceptions: false
});
import { assert } from 'chai';
import { ConsoleLogger, LogLevel } from '../index';

describe('ConsoleLogger', () => {
  it('should log error messages', () => {
    let [message, level] = ConsoleLogger.formatMessage("Hi", new Error("this is a test error"));
    assert.equal(level, LogLevel.Error);
    assert.isTrue(message.indexOf("this is a test error") >= 0);
  });
});
