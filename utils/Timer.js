var replaceString = require('./replaceString');

function Timer(onException, expectedDuration) {
  this.onException = onException;
  this.expectedDuration = expectedDuration;
  this.absoluteError = expectedDuration * 0.1;

  this.active = false;
  this.timeoutId = null;
  this.startedAt = null;
}

Timer.prototype.start = function() {
  if (!this.active) {
    this.active = true;
    this.timeoutId = setTimeout(this.onTimeout.bind(this), this.expectedDuration + (this.absoluteError / 2));
    this.startedAt = Date.now();
  }
};

Timer.prototype.end = function() {
  if (this.active) {
    this.timeoutId && clearTimeout(this.timeoutId);

    var actualDuration = Date.now() - this.startedAt;
    if (this.expectedDuration - actualDuration > this.absoluteError / 2) {
      this.onException(replaceString('Terminated too early: %dms', actualDuration));
    }

    this.active = false;
    this.timeoutId = null;
    this.startedAt = null;
  }
};

Timer.prototype.onTimeout = function() {
  this.onException(replaceString('Not terminated in expected time: %dms', this.expectedDuration));
  this.end();
};

module.exports = Timer;
