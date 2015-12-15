var Client = require('../models/client');

function clientsIndex(req, res){
  Client.find(function(err, clients){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ clients: clients });
  });
}

function clientsCreate(req, res){
  var client  = new Client(req.body)

  client.save(function(err, client){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    res.status(201).json({ message: 'A New Client has been successfully created.', client: client})
  })
}

function clientsShow(req, res){
  Client.findById(req.params.id, function(err, client){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ client: client});
  });
}

function clientsUpdate(req, res){
  Client.findById(req.params.id, function(err, client){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!client) return res.status(404).json({ message: 'No Client Found???'});

    if (req.body.name)     client.name       = req.body.name;
    if (req.body.email)    client.email      = req.body.email;
    if (req.body.password) client.password   = req.body.password;
    if (req.body.industry) client.industry   = req.body.industry;

    if (req.body.contact.location)        client.contact.location                             = req.body.contact.location;
    if (req.body.prizes.contact.country)  client.prizes.contact.country                       = req.body.prizes.contact.country;
    if (req.body.prizes.contact.website)  client.prizes.contact.website                       = req.body.prizes.contact.website;
    if (req.body.prizes.contact.image)    client.prizes.contact.image                         = req.body.prizes.contact.image;

    client.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!!'});
      res.status(201).json({ message: 'Client Updated', client: client})
    });
  });
}

function clientsDelete(req, res){
  Client.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: 'Client has been successfully deleted'});
  });
}

module.exports = {
  clientsIndex:   clientsIndex,
  clientsCreate:  clientsCreate,
  clientsShow:    clientsShow,
  clientsUpdate:  clientsUpdate,
  clientsDelete:  clientsDelete
}