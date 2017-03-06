var successOnce = require('../utils').successOnce;

module.exports = function race(funcs, final) {
  final = successOnce()(true, function(ret) {
    final(ret);
  });

  funcs.forEach(function(func) {
    func(final);
  });
};
