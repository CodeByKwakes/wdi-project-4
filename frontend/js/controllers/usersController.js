angular
  .module('BeatSity')
  .controller('UsersController', UsersController);

  UsersController.$inject = ['User', 'TokenService', '$state'];

  function UsersController(User, TokenService, $state){
    var self            =  this;

    self.all            = [];
    self.user           = {};
    self.getUsers       = getUsers;
    self.register       = register;
    self.login          = login;
    self.logout         = logout;
    self.isLoggedIn  = isLoggedIn;

    function getUsers(){
      User.query(function(data){
        self.all = data.users;
      });
    }

    function handleLogin(res){
      var token = res.token ? res.token : null;
      if (token){
        self.getUsers();
        $state.go('profile');
      }
      self.user = TokenService.decodeToken();
      console.log(self.user)
    }

    function register(){
      User.register(self.user, handleLogin);
    }

    function login(){
      User.login(self.user, handleLogin);
    }

    function logout(){
      TokenService.removeToken();
      self.all = [];
      self.user = {};
    }

    function isLoggedIn(){
      var loggedIn = !!TokenService.getToken();
      return loggedIn;
    }
    if (self.isLoggedIn()){
      self.getUsers();
      self.user = TokenService.decodeToken();
    }

  return self
}

  
