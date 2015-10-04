var parallel = require('./parallel');

module.exports = function map(arr, iterator, final) {
  parallel(arr.map(function(item) {
    return function(done) {
      iterator(item, done);
    };
  }), final);
};
