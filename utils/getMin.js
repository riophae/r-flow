module.exports = function getMin(arr) {
  if (arr.length === 1) {
    return arr[0];
  }

  var n = arr[0];
  var rest = arr.slice(1);

  return Math.min(n, getMin(rest));
};
