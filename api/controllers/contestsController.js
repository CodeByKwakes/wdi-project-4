var Contest = require('../models/contest');
var Client = require('../models/client');

function contestsIndex(req, res){
  Contest.find(function(err, contests){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ contests: contests });
  });
}

function contestsCreate(req, res){
  var contest  = new Contest(req.body)

  contest.save(function(err, contest){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    Client.findOne({_id: req.body.client_id}, function(err, client){
      client.contests.push(contest);
      client.save();
    });
    res.status(201).json({ message: 'A New Contest has been successfully created.', contest: contest})
  });
}

function contestsShow(req, res){
  Contest.findById(req.params.id, function(err, contest){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ contest: contest});
  });
}

function contestsUpdate(req, res){
  Contest.findById(req.params.id, function(err, contest){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!contest) return res.status(404).json({ message: 'No Contest Found???'});

    if (req.body.title)   contest.title   = req.body.title;
    if (req.body.details) contest.details = req.body.details;
    if (req.body.rules)   contest.rules   = req.body.rules;
    if (req.body.parts)   contest.parts   = req.body.parts;

    if (req.body.prizes.grand_prize) contest.prizes.grand_prize = req.body.prizes.grand_prize;
    if (req.body.prizes.runner_up)   contest.prizes.runner_up   = req.body.prizes.runner_up;

    if (req.body.schedule.submision_date) contest.schedule.submision_date   = req.body.schedule.submision_date;
    if (req.body.schedule.submision_deadline)   contest.schedule.submision_deadline   = req.body.schedule.submision_deadline;
    if (req.body.schedule.results_date)   contest.schedule.results_date   = req.body.schedule.results_date;
    if (req.body.schedule.results_deadline)   contest.schedule.results_deadline   = req.body.schedule.results_deadline;

    if (req.body.created_at) contest.created_at  = req.body.created_at;
    if (req.body.updated_at) contest.updated_at  = req.body.updated_at;

    contest.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!!'});
      res.status(201).json({ message: 'Contest Updated', contest: contest})
    });
  });
}
 
function contestsDelete(req, res){
  Contest.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: 'Contest has been successfully deleted'});
  });
}

module.exports = {
  contestsIndex:   contestsIndex,
  contestsCreate:  contestsCreate,
  contestsShow:    contestsShow,
  contestsUpdate:  contestsUpdate,
  contestsDelete:  contestsDelete
}