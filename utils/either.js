module.exports = function either() {
  var resolved = false;

  return function(fn) {
    return function() {
      if (resolved) return;
      resolved = true;
      return fn.apply(this, arguments);
    };
  };
};
