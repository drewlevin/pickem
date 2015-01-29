// models/user.js
var mongoose = require('mongoose')
  , bcrypt   = require('bcrypt-nodejs')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

// define the schema for the user model
var userSchema = Schema({
  // Identification
  username : String,
  password : String,
  email    : String,

  // Information
  joined     : { type: Date, default: Date.now },
  last_login : { type: Date, default: Date.now },

  // Foreign Keys
  leagues : [{ type: ObjectId, ref: 'League' }],
  entries : [{ type: ObjectId, ref: 'Entry'  }]
});

// Schema Methods
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);