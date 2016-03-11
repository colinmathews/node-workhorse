export default function clone(source) {
  let json = JSON.stringify(source);
  return JSON.parse(json);
}

export function cloneInto(source, dest) {
  let copy = clone(source);
  let props = Object.keys(copy);
  props.forEach((key) => {
    dest[key] = copy[key];
  });
}
