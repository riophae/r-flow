var r = require('../');
var test = require('tape');

var utils = require('../utils');
var Timer = utils.Timer;

test('simple sequence tasks', function(t) {
  t.plan(4);

  var tasks = [];
  var initialVal = 0;

  tasks.push(function(next, val) {
    t.equal(val, 0);
    setTimeout(next, 100, val + 1);
  });

  tasks.push(function(next, val) {
    t.equal(val, 1);
    next(val * 2);
    next(val * 2); // should not be executed
  });

  tasks.push(function(next, val) {
    t.equal(val, 2);
    setTimeout(next, 100, val * val);
  });

  r.sequence(tasks, function(result) {
    t.equal(result, 4);
  }, initialVal);
});

test('delay helper', function(t) {
  var duration = 1000;
  var val = { foo: 'bar' };
  var timer = new Timer(t.fail, duration);

  timer.start();
  r.delay(duration)(function(ret) {
    timer.end();

    t.equal(ret, val);
    t.end();
  }, val);
});

test('sequence delayed tasks', function(t) {
  var tasks = [];
  var duration = 1000;
  var val = { foo: 'bar' };
  var timer = new Timer(t.fail, duration);

  tasks.push(function(next) {
    next(val);
  });

  tasks.push(r.delay(duration));

  timer.start();
  r.sequence(tasks, function(ret) {
    timer.end();

    t.equal(ret, val);
    t.end();
  });
});

test('parallel tasks', function(t) {
  var numbers = [ 600, 400, 300, 1000, 800 ];
  var max = utils.getMax(numbers);
  var timer = new Timer(t.fail, max);

  t.plan(numbers.length + 1);

  var delayedTasks = numbers.map(function(n) {
    return function(done) {
      t.skip('iterating');
      setTimeout(done, n, n);
    };
  });

  timer.start();
  r.parallel(delayedTasks, function(rets) {
    timer.end();

    t.deepEqual(rets, numbers);
  });
});

test('earliest wins', function(t) {
  var numbers = [ 600, 400, 300, 1000, 800 ];
  var min = utils.getMin(numbers);
  var timer = new Timer(t.fail, min);

  var delayedTasks = numbers.map(function(n) {
    return function(done) {
      setTimeout(done, n, n);
    };
  });

  timer.start();
  r.race(delayedTasks, function(ret) {
    timer.end();

    t.equal(ret, min);
    t.end();
  });
});

test('map', function(t) {
  var numbers = [ 600, 400, 300, 1000, 800 ];
  var max = utils.getMax(numbers);
  var timer = new Timer(t.fail, max);

  t.plan(numbers.length + 1);

  timer.start();
  r.map(numbers, function(n, done) {
    t.skip('iterating');
    setTimeout(done, n, n);
  }, function(rets) {
    timer.end();

    t.deepEqual(rets, numbers);
  });
});

test('reduce', function(t) {
  var numbers = [ 300, 600, 400, 1000, 800 ];
  var sum = utils.getSum(numbers);
  var initialVal = 0;
  var timer = new Timer(t.fail, sum);

  t.plan(numbers.length + 1);

  timer.start();
  r.reduce(numbers, function(accum, n, done) {
    t.skip('n: ' + n + ' accum: ' + accum);
    setTimeout(done, n, accum + n);
  }, function(ret) {
    timer.end();

    t.equal(ret, sum);
  }, initialVal);
});

test('repeat', function(t) {
  var times = 5;
  var cycle = 200;
  var timer = new Timer(t.fail, times * cycle);

  var arr = [];

  timer.start();
  r.repeat(times, function(i, done) {
    arr.push(i);
    setTimeout(done, cycle);
  }, function() {
    timer.end();

    t.deepEqual(arr, [ 0, 1, 2, 3, 4 ]);
    t.end();
  });
});

test('until', function(t) {
  var expected = 5;
  var i = 0;

  var cycle = 200;
  var timer = new Timer(t.fail, expected * cycle);

  t.plan(expected + 1);

  timer.start();
  r.until(function(fail, succeed) {
    t.skip('iterating');
    setTimeout(++i < 5 ? fail : succeed, cycle);
  }, function() {
    timer.end();

    t.equal(i, expected);
  });
});

test('some', function(t) {
  var numbers = [ 600, 400, 300, 1000, 800 ];
  var expected = utils.getMin(numbers);
  var indexOfExpected = numbers.indexOf(expected);
  var sum = utils.getSum(numbers.slice(0, indexOfExpected + 1));
  var timer = new Timer(t.fail, sum);

  t.plan((indexOfExpected + 1) + 1);

  timer.start();
  r.some(numbers, function(n, fail, succeed) {
    t.skip('iterating');
    setTimeout(n === expected ? succeed : fail, n, n);
  }, function(ret) {
    timer.end();

    t.equal(ret, expected);
  });
});
