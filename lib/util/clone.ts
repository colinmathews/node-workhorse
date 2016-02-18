export default function (source) {
  let json = JSON.stringify(source);
  return JSON.parse(json);
}
