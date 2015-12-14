var Producer = require('../models/producer');

function producersIndex(req, res){
  Producer.find(function(err, producers){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ producers: producers });
  });
}

function producersShow(req, res){
  Producer.findById(req.params.id, function(err, producer){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ producer: producer});
  });
}

function producersUpdate(req, res){
  Producer.findById(req.params.id, function(err, producer){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!producer) return res.status(404).json({ message: 'No Producer found???'});

    if (req.body.email) producer.local.email = req.body.email;
    if (req.body.password) producer.local.password = req.body.password;

    producer.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!'});

      res.status(201).json({ message: 'User Successfully Updated.', producer: producer})
    });    
  });
}

function producersDelete(req, res){
  Producer.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: 'Producer has been successfully deleted'});
  });
}

module.exports = {
  producersIndex:   producersIndex,
  // producersCreate:  producersCreate,
  producersShow:    producersShow,
  producersUpdate:  producersUpdate,
  producersDelete:  producersDelete
}