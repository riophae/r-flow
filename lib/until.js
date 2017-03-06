var either = require('../utils').either;

module.exports = function until(func, final) {
  var e = either();

  func(e(function() {
    until(func, final);
  }), e(final));
};
