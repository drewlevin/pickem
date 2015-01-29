

var mongoose = require('mongoose')
  , User     = require('../../models/user')
  , League   = require('../../models/league')
  , Entry    = require('../../models/entry')
  , Pick     = require('../../models/pick')
  , Sport    = require('../../models/sport')
  , Team     = require('../../models/team')
  , Set      = require('../../models/set')
  , Game     = require('../../models/game')

  , Promise  = require('bluebird')
;

// Clear the data, return a promise
function clearCollections (conn) {

  console.log('enter clearCollections');
  var promise = new Promise(function (resolve, reject) {
    // Create empty collections if needed
    conn.collection('users');
    conn.collection('leagues');
    conn.collection('entrys');
    conn.collection('picks');
    conn.collection('sports');
    conn.collection('teams');
    conn.collection('sets');
    conn.collection('games');

    // Reset collections
    conn.model('User').remove().exec()
    .then(function () {
      return conn.model('League').remove().exec();
    }).then(function () {
      return conn.model('Entry').remove().exec();
    }).then(function () {
      return conn.model('Pick').remove().exec();
    }).then(function () {
      return conn.model('Sport').remove().exec();
    }).then(function () {
      return conn.model('Team').remove().exec();
    }).then(function () {
      return conn.model('Set').remove().exec();
    }).then(function () {
      return conn.model('Game').remove().exec();
    }).then(
      function () {
        resolve(conn);
      },
      function (err) {
        reject(err);
      }
    ).end();
  });

  return promise;
};

module.exports = clearCollections;