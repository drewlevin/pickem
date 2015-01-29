var mongoose = require('mongoose')
  , Sport    = require('../../models/sport')
  , Team     = require('../../models/team')
  , Set      = require('../../models/set')
  , Game     = require('../../models/game')

  , Promise  = require('bluebird')
;

// Shuffle an array and return it
function shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Create a set of games, given the sportID, the list of all team documents,
// and the index label (week) for the set.
// Returns a promise
function createSet(conn, sportID, teams, week) {
  var promise = new Promise(function (resolve, reject) {

    var gameArray = [];

    setTitle = 'Week ' + String(week);
    shuffledList = shuffle(teams);

    for (var j=0; j<shuffledList.length-1; j = j+2) {
//      console.log(shuffledList[j].fullName(), ' vs. ', shuffledList[j+1].fullName());

      gameArray.push({
        date   : new Date(2014, Math.floor(week / 4) + 1, 1 + (week % 7)*7),
        spread : Math.floor(Math.random() * 21) - 10,
        homeScore : Math.floor(Math.random() * 43),
        awayScore : Math.floor(Math.random() * 43),

        sportId : sportID,
        awayId  : shuffledList[j]._id,
        homeId  : shuffledList[j+1]._id
      });
    }

    conn.model('Game').create(gameArray).then(function () {
      var games = arguments;

      conn.model('Set').create({
        name    : setTitle,
        sportId : sportID,
        games   : Array.prototype.slice.call(games).map(
                    function (gameObj) { return gameObj._id; }
                  )
      }).then(function () { resolve(); });
    });

  });

  return promise;
}

// Adds dummy sets to the databse
// Returns a promise
var addSets = function(conn) {
  console.log('enter addSets');

  var setTitle = ''
    , shuffledList
    , promiseArray = []
  ;

  var promise = new Promise(function (resolve, reject) {

    // Get a list of every team, assume only NFL for now
    conn.model('Sport').findOne({name: 'NFL'}, function(err, sport) {
      conn.model('Team').populate(sport, {path: 'teams'}, function (err, sport) {
        for (var i=1; i<10; i++) {
          promiseArray.push(createSet(conn, sport._id, sport.teams, i));
        }

        Promise.all(promiseArray).then(function() {
          resolve();
        });
      });
    });
  });

  return promise;
};

module.exports = addSets;