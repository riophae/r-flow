var once = require('../utils').once;
var successOnce = require('../utils').successOnce;
var noop = require('../utils').noop;

module.exports = function sequence(funcs, final, val) {
  var so = successOnce();
  final = so(true, final || noop);

  worker(funcs.map(function(fn) {
    return so(false, fn);
  }), final, val);
};

function worker(funcs, final, val) {
  var currentFn = funcs[0];
  var rest = funcs.slice(1);

  if (currentFn) {
    currentFn(once(function(ret) {
      worker(rest, final, ret);
    }), val);
  } else {
    final(val);
  }
}
