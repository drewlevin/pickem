// models/team.js
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;

// define the schema for the team model
var teamSchema = Schema({
  // Identification
  name : String,
  city : String,
});

// Schema Methods
teamSchema.methods.fullName = function() {
  return this.city + ' ' + this.name;
};

// Export the model
module.exports  = mongoose.model('Team', teamSchema);