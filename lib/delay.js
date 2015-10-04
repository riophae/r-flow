var toArray = require('../utils').toArray;

module.exports = function delay(durationMS) {
  return function(done) {
    var ctx = this;
    var args = toArray(arguments, 1);

    setTimeout(function() {
      done.apply(ctx, args);
    }, durationMS);
  };
};
