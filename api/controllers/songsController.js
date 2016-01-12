var Song      = require('../models/song');
var User  = require('../models/user');

function songsIndex(req, res){
  Song.find({}).populate(['artist']).exec(function(err, songs){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ songs: songs });
  });
}

function songsCreate(req, res){

  console.log(req.body);
  var song = new Song(req.body)

  song.save(function(err, song){
    console.log(song);
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    User.findOne({_id: req.body.user_id}, function(err, user){
      user.local.songs.push(song);
      user.save();
    });
    res.status(201).json({ message: 'Song has been created', song: song});
  });
}

function songsShow(req, res){
  Song.findById(req.params.id, function(err, song){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ song: song});
  });
}

function songsUpdate(req, res){
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!song) return res.status(404).json({ message: 'No Song Found???'});

    song.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!!'});
      res.status(201).json({ message: 'Song Updated', song: song})
    });
  });
}

function songsDelete(req, res){
  Song.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: ' Song has been deleted'});
  })
}

module.exports = {
  songsIndex:   songsIndex,
  songsCreate:  songsCreate,
  songsShow:    songsShow,
  songsUpdate:  songsUpdate,
  songsDelete:  songsDelete
}