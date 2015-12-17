var User    = require('../models/user');

function usersIndex(req, res){
  // User.find({ role: "user" })
  User.find({}).populate(['local.songs', 'local.contests']).exec(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ users: users });
  });
}

function usersCreate(req, res){
  var user  = new User(req.body)

  user.save(function(err, user){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    res.status(201).json({ message: 'A New User has been successfully created.', user: user})
  })
}

function usersShow(req, res){
  User.findById(req.params.id).populate(['local.songs', 'local.contests']).exec(function(err, user){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ user: user});
  })
}

function usersUpdate(req, res){
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!user) return res.status(404).json({ message: 'No User found???'});

    user.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!'});
      res.status(201).json({ message: 'User Profile Updated.', user: user})
    });    
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: 'User has been successfully deleted'});
  });
}

module.exports = {
  usersIndex:   usersIndex,
  usersCreate:  usersCreate,
  usersShow:    usersShow,
  usersUpdate:  usersUpdate,
  usersDelete:  usersDelete
}