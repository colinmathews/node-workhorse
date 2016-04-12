export default function (source: any, path: string): any {
  'use strict';
  let dots = path.split('.');
  let target = source;
  while (dots.length > 0) {
    target = source[dots[0]];
    dots = dots.slice(1);
  }
  return target;
}
