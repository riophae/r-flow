var once = require('../utils').once;

module.exports = function some(arr, iteratee, final) {
  worker(arr.map(function(iterator) {
    return function(fail, succeed) {
      iteratee(iterator, fail, succeed);
    };
  }), once(final));
};

function worker(funcs, final) {
  var func = funcs[0];
  var rest = funcs.slice(1);

  func(function() {
    if (rest.length) {
      worker(rest, final);
    } else {
      final();
    }
  }, final);
}
