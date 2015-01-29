// models/sport.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;
//  , Team     = require('./team');

// define the schema for the sport model
var sportSchema = Schema({
  // Identification
  name : String,

  // Embedded Team Model
  teams : { type: [ObjectId], ref: "Team"}
});

// Schema Methods

// Export the model
module.exports = mongoose.model('Sport', sportSchema);