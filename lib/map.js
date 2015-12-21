var parallel = require('./parallel');

module.exports = function map(arr, iteratee, final) {
  parallel(arr.map(function(iterator) {
    return function(done) {
      iteratee(iterator, done);
    };
  }), final);
};
