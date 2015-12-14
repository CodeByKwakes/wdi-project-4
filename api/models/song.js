var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  title: String,
  image: String,
  genre: String,
  bpm: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Song', songSchema);