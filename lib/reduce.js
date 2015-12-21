var sequence = require('./sequence');

module.exports = function reduce(arr, iteratee, final, initialVal) {
  sequence(arr.map(function(iterator) {
    return function(done, val) {
      iteratee(val, iterator, done);
    };
  }), final, initialVal);
};
