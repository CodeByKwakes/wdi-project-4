var mongoose = require('mongoose');

var producerSchema = new mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    image: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    contact: {
      location: String,
      country: String,
    },
    created_at: Date,
    updated_at: Date,
    songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }]
  }
});

module.exports = mongoose.model('Producer', producerSchema);


