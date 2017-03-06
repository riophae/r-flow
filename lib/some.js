var successOnce = require('../utils').successOnce;
var either = require('../utils').either;

module.exports = function some(arr, iteratee, final) {
  var so = successOnce();
  final = so(true, final);

  worker(arr.map(function(iterator) {
    return function(fail, succeed) {
      iteratee(iterator, so(false, fail), succeed);
    };
  }), final);
};

function worker(funcs, final) {
  var currentFn = funcs[0];
  var rest = funcs.slice(1);
  var e = either();

  currentFn(e(function() {
    if (rest.length) {
      worker(rest, final);
    } else {
      final();
    }
  }), e(final));
}
