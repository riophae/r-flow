var once = require('../utils').once;

module.exports = function parallel(funcs, final) {
  var rets = new Array(funcs.length);
  var count = 0;

  funcs.forEach(function(func, idx) {
    func(once(function(ret) {
      rets[idx] = ret;
      if (++count === funcs.length) {
        final(rets);
      }
    }));
  });
};
