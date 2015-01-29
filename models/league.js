// models/league.js
var mongoose = require('mongoose')
  , bcrypt   = require('bcrypt-nodejs')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the league model
var leagueSchema = Schema({
  // Identification
  name     : String,
  password : String,

  // Information
  created : { type: Date, default: Date.now },

  // Foreign Keys
  users   : [{ type: ObjectId, ref: 'User'  }],
  entries : [{ type: ObjectId, ref: 'Entry' }],
  sportId : { type: ObjectId, ref: 'Sport' }
});

// Schema Methods
leagueSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

leagueSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export the model
module.exports = mongoose.model('League', leagueSchema);
