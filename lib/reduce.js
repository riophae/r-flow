var sequence = require('./sequence');

module.exports = function reduce(arr, iterator, final, initialVal) {
  sequence(arr.map(function(item) {
    return function(done, val) {
      iterator(val, item, done);
    };
  }), final, initialVal);
};
