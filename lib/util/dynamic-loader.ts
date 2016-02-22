let fs = require('fs');
let path = require('path');
import deepDots from './deep-dots';

let packageName;
let _currentPackageName = () => {
  if (packageName) {
    return packageName;
  }
  let json = fs.readFileSync(path.resolve(__dirname, '../../../package.json'));
  let meta = JSON.parse(json);
  return meta.name;
};

let _loadClass = (modulePath, className) => {
  let oClass = require(modulePath);
  if (!oClass) {
    throw new Error(`Could not find module ${modulePath}`);
  }
  if (className) {
    oClass = deepDots(oClass, className);
    if (!oClass) {
      throw new Error(`Could not find class ${className} in module ${modulePath}`); 
    }
  }
  return oClass;
};

let _instantiate = (oClass, href) => {
  if (!oClass.prototype) {
    oClass = oClass.default;
  }
  if (!oClass.prototype) {
    throw new Error(`Expected ${href} to have a prototype`); 
  }
  let instance = Object.create(oClass.prototype);
  if (instance.constructor) {
    instance.constructor.apply(instance);
  }
  return instance;
};

export default function (href) {
  let [ modulePath, className ] = href.split(':');
  if (modulePath === _currentPackageName()) {
    modulePath = path.resolve(__dirname, '../../index');
  }
  let oClass = _loadClass(modulePath, className);
  return _instantiate(oClass, href);
}
