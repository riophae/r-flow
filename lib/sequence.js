var once = require('../utils').once;

module.exports = function sequence(funcs, final, val) {
  var currentFn = funcs[0];
  var rest = funcs.slice(1);

  if (currentFn) {
    currentFn(once(function(ret) {
      sequence(rest, final, ret);
    }), val);
  } else {
    final && final(val);
  }
};
