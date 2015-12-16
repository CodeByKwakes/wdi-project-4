angular
  .module('BeatSity')
  .controller('ProducersController', ProducersController);

  ProducersController.$inject = ['Producer', 'TokenService', '$state'];

  function ProducersController(Producer, TokenService, $state){
    var self            =  this;

    self.all            = [];
    self.producer       = {};
    self.getProducers   = getProducers;
    self.register       = register;
    self.login          = login;
    self.logout         = logout;
    self.checkLoggedIn  = checkLoggedIn;

    function getProducers(){
      Producer.query(function(data){
        self.all = data.producers;
      });
    }

    function handleLogin(res){
      var token = res.token ? res.token : null;
      if (token){
        self.getProducers();
        $state.go('profile');
      }
      self.producer = TokenService.decodeToken();
      console.log(self.producer)
    }

    function register(){
      Producer.register(self.producer, handleLogin);
    }

    function login(){
      Producer.login(self.producer, handleLogin);
    }

    function logout(){
      TokenService.removeToken();
      self.all = [];
      self.producer = {};
    }

    function checkLoggedIn(){
      var loggedIn = !!TokenService.getToken();
      return loggedIn;
    }
    if (self.checkLoggedIn()){
      self.getProducers();
      self.producer = TokenService.decodeToken();
    }

  return self
}

  
