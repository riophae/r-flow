module.exports = function getSum(numbers) {
  return numbers.reduce(function(accum, n) {
    return accum + n;
  }, 0);
};
