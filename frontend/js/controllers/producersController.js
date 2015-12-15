angular
  .module('BeatSity')
  .controller('ProducersController', ProducersController);

  ProducersController.$inject = [];

  function ProducersController(){
    var self            =  this;

    self.all            = [];
    self.producer       = {};
    self.newProducer    = {};
    self.getProducers   = getProducers;
    self.addProducer    = addProducer;
    self.deleteProducer = deleteProducer;

  }

  function getProducers(){}
  function addProducer(){}
  function deleteProducer(){}
