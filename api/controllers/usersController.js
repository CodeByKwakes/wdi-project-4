var User    = require('../models/user');

function usersIndex(req, res){
  User.find().populate('local.songs').exec(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ users: users });
  });
/*  User.find().populate('local.contests').exec(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ users: users });
  });*/

}

function usersCreate(req, res){
  var user  = new User(req.body)

  user.save(function(err, user){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    res.status(201).json({ message: 'A New User has been successfully created.', user: user})
  })
}

function usersShow(req, res){
  User.findById(req.params.id).populate('local.songs').exec(function(err, user){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ user: user});
  })

/*  User.findById(req.params.id).populate('local.contests').exec(function(err, user){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ user: user});
  })*/
}

function usersUpdate(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!user) return res.status(404).json({ message: 'No User found???'});

    if (req.body.local.username) user.local.username      = req.body.local.username;
    if (req.body.local.first_name) user.local.first_name  = req.body.local.first_name;
    if (req.body.local.last_name) user.local.last_name    = req.body.local.last_name;
    if (req.body.local.image) user.local.image            = req.body.local.image;
    if (req.body.local.email) user.local.email            = req.body.local.email;
    if (req.body.local.password) user.local.password      = req.body.local.password;
    // if (req.body.local.song) user.local.song              = req.body.local.song;
    if (req.body.local.contact.location) user.local.contact.location = req.body.local.contact.location;
    if (req.body.local.contact.country) user.local.contact.country = req.body.local.contact.country;
    if (req.body.local.contact.website) user.local.contact.website = req.body.local.contact.website;

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