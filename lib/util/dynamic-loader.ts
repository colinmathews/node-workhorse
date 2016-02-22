let fs = require('fs');
let path = require('path');
import deepDots from './deep-dots';

let _pathFromThisModule = (relativePath) => {
  let extension = path.extname(relativePath);
  let filePath1 = path.resolve(__dirname, relativePath);
  let filePath2 = path.resolve(__dirname, '../', relativePath);
  if (!extension) {
    filePath1 += '.js';
    filePath2 += '.js';
  }

  if (fs.existsSync(filePath1)) {
    console.log('todo: filepath1 = %s', filePath1);
    return filePath1;
  }
  console.log('todo: filepath2 = %s', filePath2);
  return filePath2;
};

let packageName;
let _currentPackageName = () => {
  let filePath = _pathFromThisModule('../../package.json');
  let packageMeta = require(filePath);
  return packageMeta.name;
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
    modulePath = _pathFromThisModule('../../index');
  }
  let oClass = _loadClass(modulePath, className);
  return _instantiate(oClass, href);
}
