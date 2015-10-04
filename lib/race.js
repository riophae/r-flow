var once = require('once');

module.exports = function race(funcs, final) {
  final = once(final);

  funcs.forEach(function(func) {
    func(function(ret) {
      final(ret);
    });
  });
};
