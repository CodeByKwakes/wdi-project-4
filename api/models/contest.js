var mongoose = require('mongoose');
var User = require('./user')

var contestSchema = new mongoose.Schema({
  title: String,
  details: String,
  rules: String,
  parts: String,
  prizes: {
    grand_prize: String,
    runner_up: String,
  },
  schedule: {
    submision_date: Date,
    submision_deadline: Number,
    results_date: Date,
    results_deadline: Number,
  },
  // entries:[{ type: mongoose.Schema.ObjectId, ref: 'Song'}],
  created_at: Date,
  updated_at: Date
})

module.exports = mongoose.model('Contest', contestSchema);



