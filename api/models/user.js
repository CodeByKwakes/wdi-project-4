var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Song = require('./song')

var userSchema = new mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    role: { type: String, required: true },
    image: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    contact: {
      location: String,
      country: String,
      website: String,
    },
    created_at: Date,
    updated_at: Date,
    songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }],
    contests: [{ type: mongoose.Schema.ObjectId, ref: 'Contest' }]
  }
});

userSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);


