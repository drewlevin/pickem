// models/pick.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the pick model
var pickSchema = Schema({

  // Foreign Keys
  gameId : { type: ObjectId, ref: 'Sport' },
  teamId : { type: ObjectId, ref: 'Team'  },
});

// Schema Methods

// Export the model
module.exports = mongoose.model('Pick', pickSchema);