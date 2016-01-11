var Contest = require('../models/contest');
var User    = require('../models/user');

function contestsIndex(req, res){
  Contest.find({}).populate(['entries']).exec(function(err, contests){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ contests: contests });
  });
}

function contestsCreate(req, res){
  var contest  = new Contest(req.body)

  contest.save(function(err, contest){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    User.findOne({_id: req.body.user_id}, function(err, user){
      user.local.contests.push(contest);
      user.save();
    });
    res.status(201).json({ message: 'A New Contest has been successfully created.', contest: contest})
  });
}

function contestsShow(req, res){
  Contest.findById(req.params.id).populate(['entries']).exec(function(err, contest){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ contest: contest});
  });
}

function contestsUpdate(req, res){
  Contest.findByIdAndUpdate(req.params.id, req.body, function(err, contest){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!contest) return res.status(404).json({ message: 'No Contest Found???'});

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