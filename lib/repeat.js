var once = require('once');

module.exports = function repeat(times, func, final) {
  worker(0, times, func, final);
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
