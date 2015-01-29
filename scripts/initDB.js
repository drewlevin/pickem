// Drew Levin
// August 12, 2014
//
// Initialize mongo database for the pickem application

var mongoose = require('mongoose')
  , User     = require('../models/user')
  , League   = require('../models/league')
  , Entry    = require('../models/entry')
  , Pick     = require('../models/pick')
  , Sport    = require('../models/sport')
  , Team     = require('../models/team')
  , Set      = require('../models/set')
  , Game     = require('../models/game')

  , clearCollections = require('./initDB/clearCollections')
  , addSportsAndTeams = require('./initDB/addSportsAndTeams')
  , addSets  = require('./initDB/addSets')
;

var conn = mongoose.createConnection('mongodb://localhost/pickem');

function done() {
  console.log('finished');
  setTimeout(process.exit, 3000);
}

function done_error(err) {
  console.error('finished with error');
  console.error(err);
  process.exit(1);
}

conn.once('open', function() {
  clearCollections(conn)
  .then(addSportsAndTeams)
  .then(addSets)
  .then(done, done_error);
});