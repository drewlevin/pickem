// models/entry.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the entry model
var entrySchema = Schema({
  // Identification
  name : String,

  // Information
  created : { type: Date, default: Date.now },

  // Foreign Keys
  userId    : { type: ObjectId, ref: 'User'   },
  leagueId  : { type: ObjectId, ref: 'League' },
  sportId   : { type: ObjectId, ref: 'Sport'  }
});

// Schema Methods

// Export the model
module.exports = mongoose.model('Entry', entrySchema);