angular
  .module('BeatSity')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', '$state', 'currentUser'];
function UsersController(User, TokenService, $state, currentUser){
  this.controllerName = "UsersController";

  var self         =  this;

  self.all         = [];
  self.user        = {};
  self.getUsers    = getUsers;
  self.getUser     = getUser;
  self.register    = register;
  self.login       = login;
  self.logout      = logout;
  self.isLoggedIn  = isLoggedIn;
  self.currentUser = currentUser.getUser();
  self.role        = currentUser.getRole();
  console.log(self.currentUser)
  console.log("ROLE: ", self.role);

  function getUsers(){
    User.query(function(data){
      self.all = data.users;
    });
  }

  function getUser(id){
    User.get({ id: id }, function(data) {
      console.log("USERS:", data)
      self.user = data.user;
    })
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
    console.log(self.user)
    User.register(self.user, handleLogin);
  }

  function login(){
    User.login(self.user, handleLogin);
  }

  function logout(){
    TokenService.removeToken();
    currentUser.removeUser();
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


