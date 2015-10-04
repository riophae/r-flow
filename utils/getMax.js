module.exports = function getMax(arr) {
  var a = arr[0];
  var rest = arr.slice(1);

  return Math.max(a, rest.length > 1 ? getMax(rest) : rest[0]);
};
