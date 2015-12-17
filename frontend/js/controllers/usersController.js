angular
  .module('BeatSity')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', '$state', 'currentUser', '$stateParams'];
function UsersController(User, TokenService, $state, currentUser, $stateParams){
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
  self.editUser    = editUser;
  // console.log(self.currentUser)
  // console.log("ROLE: ", self.role);

  if($stateParams.id){
    User.get({id:$stateParams.id}, function(data){
      self.user = data.user
    })
  }

  function editUser(){
    User.update({id:self.user._id}, self.user, function(data){
      console.log(data);
    })
  }

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


