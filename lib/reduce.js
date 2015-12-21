var sequence = require('./sequence');

module.exports = function reduce(arr, iteratee, final, seed) {
  sequence(arr.map(function(iterator) {
    return function(done, val) {
      iteratee(val, iterator, done);
    };
  }), final, seed);
};
