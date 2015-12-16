angular
  .module('BeatSity')
  .controller('ClientsController', ClientsController);

  ClientsController.$inject = ['Client', 'TokenService', '$state'];

  function ClientsController(Client, TokenService, $state){
    var self            =  this;

    self.all            = [];
    self.client         = {};
    self.getClients     = getClients;
    self.register       = register;
    self.login          = login;
    self.logout         = logout;
    self.checkLoggedIn  = checkLoggedIn;

    function getClients(){
      Client.query(function(data){
        self.all = data.clients;
      });
    }

    function handleLogin(res){
      var token = res.token ? res.token : null;
      if (token){
        self.getClients();
        $state.go('home');
      }
      self.client = TokenService.decodeToken();
    }

    function register(){
      Client.register(self.client, handleLogin);
    }

    function login(){
      Client.login(self.client, handleLogin);
    }

    function logout(){
      TokenService.removeToken();
      self.all = [];
      self.client = {};
    }

    function checkLoggedIn(){
      var loggedIn = !!TokenService.getToken();
      return loggedIn;
    }
    if (self.checkLoggedIn()){
      self.getClients();
      self.client = TokenService.decodeToken();
    }

  return self
}

  
