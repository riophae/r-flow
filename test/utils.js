var utils = require('../utils');
var test = require('tape');

test('get max', function(t) {
  var max1 = utils.getMax([ 1, 5, 3, 7, 4 ]);
  t.equal(max1, 7);

  var max2 = utils.getMax([ 2, 10 ]);
  t.equal(max2, 10);

  var max3 = utils.getMax([ 1 ]);
  t.equal(max3, 1);

  t.end();
});

test('get min', function(t) {
  var min1 = utils.getMin([ 1, 5, 3, 7, 4 ]);
  t.equal(min1, 1);

  var min2 = utils.getMin([ 2, 10 ]);
  t.equal(min2, 2);

  var min3 = utils.getMin([ 1 ]);
  t.equal(min3, 1);

  t.end();
});

test('get sum', function(t) {
  var sum1 = utils.getSum([]);
  t.equal(sum1, 0);

  var sum2 = utils.getSum([ 1, 2, 4 ]);
  t.equal(sum2, 7);

  var sum3 = utils.getSum([ 5 ]);
  t.equal(sum3, 5);

  t.end();
});

test('replace string', function(t) {
  var str = 'The %s brown fox jumps %s the lazy dog';
  var replaced = utils.replaceString(str, 'quick', 'over');
  var expected = 'The quick brown fox jumps over the lazy dog';

  t.equal(replaced, expected);
  t.end();
});

test('convert array-like to real array', function(t) {
  function returnArgs() { return arguments; }
  var arrayLike = returnArgs(1, 2, 3);
  var converted = utils.toArray(arrayLike);

  t.deepEqual(converted, [ 1, 2, 3 ]);
  t.end();
});

test('timer', function(t) {
  var Timer = utils.Timer;

  t.test('basic', function(st) {
    var delay = 100;

    var timer = new Timer(function(msg) {
      st.ok(msg.match(delay + 'ms'));
      st.end();
    }, delay);

    timer.start();
    st.timeoutAfter(delay * 2);
  });

  t.test('should throw when terminated earlier than expected', function(st) {
    var delay = 100;

    var timer = new Timer(function(msg) {
      st.ok(msg.match('too early'));
      st.end();
    }, delay);

    timer.start();
    setTimeout(timer.end.bind(timer), delay * (1 - 0.2));
    st.timeoutAfter(delay * 2);
  });

  t.test('should throw when not terminated in expected time', function(st) {
    var delay = 100;
    var start = Date.now();

    var timer = new Timer(function(msg) {
      st.ok(msg.match('Not terminated'));

      var duration = Date.now() - start;
      st.ok(Math.abs(duration - delay) / delay < 0.2);

      st.end();
    }, delay);

    timer.start();
    st.timeoutAfter(delay * 2);
  });
});
