var successOnce = require('../utils').successOnce;

module.exports = function race(funcs, final) {
  var final_ = successOnce()(true, function(ret) {
    final(ret);
  });

  funcs.forEach(function(func) {
    func(final_);
  });
};
