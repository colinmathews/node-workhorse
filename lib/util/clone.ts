import util = require('util');

// Error instances are special and don't stringify
const errorProperties = ['message', 'name', 'stack', 'fileName', 'lineNumber', 'columnNumber'];

const primitives = ['string', 'boolean', 'number', 'function', 'undefined'];

const MAX_DEPTH = 50;

// http://www.bennadel.com/blog/2664-cloning-regexp-regular-expression-objects-in-javascript.htm
function cloneRegExp(input: RegExp): RegExp {
  'use strict';
  let pattern = input.source;
  let flags = '';
  if (input.global) {
    flags += 'g';
  }
  if (input.ignoreCase) {
    flags += 'i';
  }
  if (input.multiline) {
    flags += 'm';
  }
  return (new RegExp(pattern, flags));
}

export default function clone(source: any, depth: number = 0): any {
  'use strict';
  if (depth > MAX_DEPTH) {
    throw new Error('Possible circular cloning prevented');
  }
  if (source === null) {
    return null;
  }
  let type = typeof (source);
  if (primitives.indexOf(type) >= 0) {
    return source;
  }
  if (util.isDate(source)) {
    return new Date(source.valueOf());
  }
  if (util.isArray(source)) {
    return source.map((row) => {
      return clone(row, depth + 1);
    });
  }
  if (util.isRegExp(source)) {
    return cloneRegExp(source);
  }
  if (util.isError(source)) {
    let dest = Object.keys(source).reduce(
      (result, key) => {
        result[key] = clone(source[key], depth + 1);
        return result;
      },
      {}
    );
    errorProperties.forEach((key) => {
      dest[key] = source[key];
    });
    return dest;
  }
  if (type !== 'object') {
    throw new Error('Unexpected type: ' + type);
  }

  return Object.keys(source).reduce(
    (result, key) => {
      result[key] = clone(source[key], depth + 1);
      return result;
    },
    {}
  );
}

export function cloneInto(source: any, dest: any): void {
  'use strict';
  let copy = clone(source);
  let props = Object.keys(copy);
  props.forEach((key) => {
    dest[key] = copy[key];
  });
}
