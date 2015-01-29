// models/set.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the set model
var setSchema = Schema({
  // Identification
  name   : String,

  // Foreign Keys
  sportId : { type: ObjectId, ref: 'Sport' },
  games   : { type: [ObjectId], ref: 'Game' }
});

// Schema Methods

// Export the model
module.exports = mongoose.model('Set', setSchema);