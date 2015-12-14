var Song = require('../models/song');
var Producer = require('../models/producer');

function songsIndex(req, res){
  Song.find({}, function(err, songs){
    if (err) return res.status(404).send(err);
    console.log("Number 1");
    res.status(200).send(songs);
  });
}

function songsCreate(req, res){
  var song = new Song(req.body.song);
  console.log("Number 2");

  song.save(function(err){
    if (err) return res.status(500).json(err);

    var name = req.body.song.producer;

    Producer.findOne({ name: name}, function(err, producer){
      producer.songs.push(song);
      producer.save();
    });
    res.status(201).json(song)
  });
  console.log("Number 3");
}

function songsShow(req, res){
  var id = req.params.id;

  Song.findById({_id: id }, function(err, song){
    if (err) return res.status(500).send(err);
    if (!song) return res.status(404).send(err);

    res.status(200).send(song)
  })
}

function songsUpdate(req, res){
  var id = req.params.id;

  Song.findByIdAndUpdate({_id: id }, req.body.song, function(err, song){
    if (err) return res.status(500).send(err);
    if (!song) return res.status(404).send(err);

    res.status(200).send(song);
  })
}
function songsDelete(req, res){
  var id = req.params.id;

  Song.remove({ _id: id }, function(err){
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  songsIndex:   songsIndex,
  songsCreate:  songsCreate,
  songsShow:    songsShow,
  songsUpdate:  songsUpdate,
  songsDelete:  songsDelete
}