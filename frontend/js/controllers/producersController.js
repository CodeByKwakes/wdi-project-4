angular
  .module('BeatSity')
  .controller('ProducersController', ProducersController);

  ProducersController.$inject = ['$http'];

  function ProducersController($http){
    var self            =  this;

    self.all            = [];
    self.producer       = {};
    self.newProducer    = {};
    self.getProducers   = getProducers;
    self.addProducer    = addProducer;
    self.deleteProducer = deleteProducer;
    self.producerReset  = producerReset;

    function getProducers(){
      $http
      .get('http://localhost:3000/api/producers')
      .then(function(response){
        self.all = response.data.producers;
        console.log(self.all);
        console.log(response)
      });
    }
    
    function addProducer(){
      $http
      .post('http://localhost:3000/api/producers', { producer: self.newProducer })
      .then(function(response){
        self.all.push(self.newProducer);
      });
    }

    function deleteProducer(producer){
      $http
      .delete('http://localhost:3000/producers/' + producer._id)
      .then(function(response){
        var index = self.all.indexOf(producer);
        self.all.splice(index, 1);
      });
    }

    function producerReset(){
      self.producer = {};
      console.log(self.producer);
    }
  getProducers();
}

  
