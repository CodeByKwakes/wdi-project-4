angular
  .module('BeatSity')
  .factory('currentUser', CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){

  var user = null;
  var role = null;

  return {
    getUser: function(){
      return user ? user : TokenService.decodeToken();
    },
    getRole: function(){
      var user =  this.getUser();
      return user ? user.role : null;
    },
    removeUser: function(){
      return user = null;
    }
  }
}