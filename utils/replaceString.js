var toArray = require('./toArray');

module.exports = function replaceString(rawString) {
  var args = toArray(arguments, 1);

  return args.reduce(function(string, arg) {
    return string.replace(/%[ds]/, arg);
  }, rawString);
};
