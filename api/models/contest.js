var mongoose = require('mongoose');

var contestSchema = new mongoose.Schema({
  title: String,
  details: String,
  rules: String,
  parts: String,
  prizes: {
    grand_prize: String,
    runner_up: String,
    community_pick: String,
  },
  schedule: {
    submision: {
      start_date: Date,
      start_time: Number,
      end_date: Date,
      end_time: Number,
    },
    voting: {
      start_date: Date,
      start_time: Number,
      end_date: Date,
      end_time: Number,
    },
    judging: {
      start_date: Date,
      start_time: Number,
      end_date: Date,
      end_time: Number,
    },
    winner: {
      date: Date,
      time: Number,
    },
  },
  created_at: Date,
  updated_at: Date,
})

module.exports = mongoose.model('Contest', contestSchema);



