var once = require('../utils').once;

module.exports = function some(arr, iterator, final) {
  worker(arr.map(function(item) {
    return function(fail, succeed) {
      iterator(item, fail, succeed);
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
