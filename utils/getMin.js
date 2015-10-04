module.exports = function getMin(arr) {
  var a = arr[0];
  var rest = arr.slice(1);

  return Math.min(a, rest.length > 1 ? getMin(rest) : rest[0]);
};
