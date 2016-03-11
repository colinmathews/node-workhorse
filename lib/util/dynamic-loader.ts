let fs = require('fs');
let path = require('path');
import deepDots from './deep-dots';

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

export function instantiate(oClass){
  if (!oClass.prototype) {
    oClass = oClass.default;
  }
  if (!oClass.prototype) {
    return null;
  }
  let instance = Object.create(oClass.prototype);
  if (instance.constructor) {
    instance.constructor.apply(instance);
  }
  return instance;
}

// TODO: Turn this parsing into a routine/model
export function instantiateFromPath(href:string) {
  let resolveFromWorkingDir = false;
  let workingDirProtocol = 'working://';
  if (href.indexOf(workingDirProtocol) === 0) {
    resolveFromWorkingDir = true;
    href = href.substring(workingDirProtocol.length);
  }
  let [ modulePath, className ] = href.split(':');
  if (resolveFromWorkingDir) {
    modulePath = path.resolve(modulePath);
  }
  if (!modulePath) {
    modulePath = path.resolve(__dirname, '../../index');
  }
  let oClass = _loadClass(modulePath, className);
  let instance = instantiate(oClass);
  if (!instance) {
    throw new Error(`Expected ${href} to have a prototype`);
  }
  return instance;
}
