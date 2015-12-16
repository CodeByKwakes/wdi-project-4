var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var clientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true},
  industry: String,
  contact: {
    location: String,
    country: String,
    website: String,
    image: String,
  },
  contests: [{ type: mongoose.Schema.ObjectId, ref: 'Contest' }]
})

clientSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

clientSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Client', clientSchema);

