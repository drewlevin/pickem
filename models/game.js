// models/game.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the game model
var gameSchema = Schema({
  // Identification
  date   : Date,
  spread : Number,  // home - away?

  // Result
  homeScore : Number,
  awayScore : Number,

  // Foreign Keys
  sportId : { type: ObjectId, ref: 'Sport' },
  awayId  : { type: ObjectId, ref: 'Team'  },
  homeId  : { type: ObjectId, ref: 'Team'  }
});

// Schema Methods

// Export the model
module.exports = mongoose.model('Game', gameSchema);