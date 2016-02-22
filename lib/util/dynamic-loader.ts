export default function (href) {
  let [ modulePath, className ] = href.split(':');
  let oClass = require(modulePath);
  if (className) {
    oClass = oClass.className
  }
  return new oClass.default();
}
