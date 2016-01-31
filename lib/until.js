var once = require('../utils').once;
var noop = require('../utils').noop;

module.exports = function until(func, final) {
  var opts = {
    func: func,
    final: once(function() {
      opts.func = noop;
      opts.final = noop;

      final.apply(null, arguments);
    })
  };

  worker(opts);
};

function worker(opts) {
  opts.func(once(function() {
    worker(opts);
  }), opts.final);
}
