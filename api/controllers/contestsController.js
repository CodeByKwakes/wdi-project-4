var Contest = require('../models/contest');

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
    res.status(201).json({ message: 'A New Contest has been successfully created.', contest: contest})
  })
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
    if (req.body.prizes.community_pick) contest.prizes.community_pick = req.body.prizes.community_pick;

    if (req.body.schedule.submision.start_date) contest.schedule.submision.start_date         = req.body.schedule.submision.start_date;
    if (req.body.schedule.submision.start_time) contest.schedule.submision.start_time         = req.body.schedule.submision.start_time;
    if (req.body.schedule.submision.end_date) contest.schedule.submision.end_date             = req.body.schedule.submision.end_date;
    if (req.body.schedule.submision.end_time) contest.schedule.submision.end_time             = req.body.schedule.submision.end_time;

    if (req.body.schedule.voting.start_date) contest.schedule.voting.start_date               = req.body.schedule.voting.start_date;
    if (req.body.schedule.voting.start_time) contest.schedule.voting.start_time               = req.body.schedule.voting.start_time;
    if (req.body.schedule.voting.end_date) contest.schedule.voting.end_date                   = req.body.schedule.voting.end_date;
    if (req.body.schedule.voting.end_time) contest.schedule.voting.end_time                   = req.body.schedule.voting.end_time;

    if (req.body.schedule.judging.start_date) contest.schedule.judging.start_date = req.body.schedule.judging.start_date;
    if (req.body.schedule.judging.start_time) contest.schedule.judging.start_time = req.body.schedule.judging.start_time;
    if (req.body.schedule.judging.end_date) contest.schedule.judging.end_date = req.body.schedule.judging.end_date;
    if (req.body.schedule.judging.end_time) contest.schedule.judging.end_time = req.body.schedule.judging.end_time;

    if (req.body.schedule.winner.date) contest.schedule.winner.date  = req.body.schedule.winner.date;
    if (req.body.schedule.winner.time) contest.schedule.winner.time  = req.body.schedule.winner.time;
       
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