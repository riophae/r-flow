module.exports = function once(fn) {
  fn.called = false;

  return function() {
    if (fn.called) return;
    fn.called = true;
    return fn.apply(this, arguments);
  };
};
