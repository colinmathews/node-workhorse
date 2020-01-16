export default function (source: any, path: string): any {
  let dots = path.split('.');
  let target = source;
  if (target === null || typeof(target) === 'undefined') {
    return null;
  }
  while (dots.length > 0) {
    target = target[dots[0]];
    if (target === null || typeof (target) === 'undefined') {
      return null;
    }
    dots = dots.slice(1);
  }
  return target;
}
