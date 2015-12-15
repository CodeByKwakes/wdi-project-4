var mongoose = require('mongoose');

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

module.exports = mongoose.model('Client', clientSchema);

