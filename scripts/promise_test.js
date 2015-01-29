var MPromise = require('mpromise'),
    Bluebird = require('bluebird'),

    Promise = Bluebird
;

// ------------- General Promise ------------------ //

function startAsync () {
  var promise = new Promise(function (resolve, reject) {
    var result;
    setTimeout(function() {
      result = Math.floor(Math.random() * 1000);
      resolve(result);
    }, 3000);
  });
  return promise;
}

function printResult(res) {
  console.log(res);
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve(res);
    }, 2000);
  });
}

function doubleResult(res) {
  console.log(res*2);
  return new Promise(function (resolve, reject) {
    resolve(res);
  });
}

// startAsync()
//   .then(printResult)
//   .then(doubleResult);


// ------------- MPromise Aggregate ------------------ //

// ------------- Bluebird Aggregate ------------------ //

function generateBluebird(i) {
  var promise = new Bluebird(function(resolve, reject) {
    setTimeout(function() {
      console.log('Promise ' + i);
      resolve(i);
    }, Math.random() * 2000);
  });

  return promise;
}

function generateBluebirdChain(i) {
  var promise = new Bluebird(function(resolve, reject) {
    setTimeout(function() {
      console.log('Promise ' + (i+1));
      resolve(i+1);
    }, Math.random() * 500);
  });

  return promise;
}

function allBluebird(n) {
  var promiseArray = [];
  for (var i=0; i<n; i++) {
    promiseArray.push(generateBluebird(i));
  }

  Promise.all(promiseArray).then(function(res) {
    console.log(res);
  });
}

function mapBluebird(n) {
  var promiseArray = [];
  for (var i=0; i<n; i++) {
    promiseArray.push(generateBluebird(i));
  }

  Promise.map(promiseArray, function(val) {
    return val;
  }, { concurrency : 1}
  ).then(function (res) {
    console.log(res);
  });
}

function chainBluebird(n) {

  var chain = new Bluebird(function (resolve, reject) {
    process.nextTick(function() {
      resolve(0);
    });
  });

  var initial = chain;

  for (var i=0; i<n; i++) {
    chain = chain.then(generateBluebirdChain);
  }

  chain.then(function (res) {
    console.log('End: ' + res);
  });
}

chainBluebird(20);