require('source-map-support').install({
  handleUncaughtExceptions: false
});
require('es6-promise').polyfill();

import Work from './lib/models/work';
import Runnable from './lib/interfaces/runnable';
import Workhorse from './lib/driver';
import Config from './lib/models/config';

export { Work, Runnable, Workhorse, Config }
