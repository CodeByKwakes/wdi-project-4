var Song = require('../models/song');
// var Producer = require('../models/producer');

function songsIndex(req, res){
  Song.find(function(err, songs){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    
    res.status(200).json({ songs: songs });
  });
}

function songsCreate(req, res){
  var song = new Song(req.body)

  song.save(function(err, song){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});

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
  Song.findById(req.params.id, function(err, song){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!song) return res.status(404).json({ message: 'No Song Found???'});

    if (req.body.title)      song.title       = req.body.title;
    if (req.body.image)      song.image       = req.body.image;
    if (req.body.genre)      song.genre       = req.body.genre;
    if (req.body.bpm)        song.bpm         = req.body.bpm;
    if (req.body.created_at) song.created_at  = req.body.created_at;
    if (req.body.updated_at) song.updated_at  = req.body.updated_at;

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