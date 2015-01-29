var mongoose  = require('mongoose')
  , Team      = require('../../models/team')
  , Sport     = require('../../models/sport')

  , SportData = require('./sports.json')
  , TeamData  = require('./teams.json')

  , Promise   = require('bluebird')
;

// Create all team documents associated with the given sport.
// Returns a promise
function createTeams(conn, sportName) {
  var promise = new Promise(function (resolve, reject) {
    conn.model('Team').create(TeamData[sportName])
    .then(function() {
      var teams = Array.prototype.slice.call(arguments).map(
        function (teamObj) { return teamObj._id; }
      );
      conn.model('Sport').update(
        { name: sportName },
        { teams: teams },
        function () {
          resolve(conn);
        }
      );
    });
  });

  return promise;
}

// Create all sports and team documents as defined in sports.json
// Returns a promise
var addSportsAndTeams = function(conn) {
  console.log('enter addSportsAndTeams');

  var promiseArray = [];

  var outerPromise = new Promise(function (resolve, reject) {
    conn.model('Sport').create(SportData)
    .then(function () {

      var sports = arguments;
      for (var i in sports) {
        promiseArray.push(createTeams(conn, sports[i].name));
      }

      Promise.all(promiseArray).then(function () {
        resolve(conn);
      });
    });
  });

  return outerPromise;
};

module.exports = addSportsAndTeams;