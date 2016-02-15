require('source-map-support').install({
  handleUncaughtExceptions: false
});
require('es6-promise').polyfill();
import Calculator from './lib/sample'

export { Calculator }
