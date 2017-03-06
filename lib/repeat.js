var once = require('../utils').once;
var noop = require('../utils').noop;

module.exports = function repeat(times, func, final) {
  worker(0, times, func, once(final || noop));
};

function worker(current, total, func, final) {
  if (current < total) {
    func(current, once(function() {
      worker(current + 1, total, func, final);
    }));
  } else {
    final();
  }
}
