module.exports = function either() {
  var flag = false;

  return function(isSuccess, fn) {
    return function() {
      if (flag) return;
      if (isSuccess) flag = true;
      return fn.apply(this, arguments);
    };
  };
};
