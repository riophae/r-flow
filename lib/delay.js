module.exports = function delay(durationMS) {
  return function(done, val) {
    setTimeout(done, durationMS, val);
  };
};
