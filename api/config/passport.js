var LocalStrategy = require('passport-local').Strategy;
var Producer      = require('../models/producer');

module.exports = function(passport){

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, function(req, email, password, done){

    Producer.findOne({ 'local.email' : email }, function(err, producer){
      if (err) return done(err, false, { message: "Something went very wrong!!!"});

      if (producer) return done(null, false, { message: "Please choose another email." });

      var newProducer = new Producer();
      newProducer.local.email      = email;
      newProducer.local.username   = req.body.username;
      newProducer.local.first_name = req.body.first_name;
      newProducer.local.last_name  = req.body.last_name;
      newProducer.local.image      = req.body.image;
      newProducer.local.password   = Producer.encrypt(password);

      newProducer.save(function(err, producer){
        if (err) return done(err, false, { message: "Something went wrong!!!"});
        return done(null, producer);
      });
    });
  }));

}






